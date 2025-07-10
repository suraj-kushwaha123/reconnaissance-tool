import { useState, useEffect } from 'react';
import { Globe, Shield, Search, Server, Lock, Activity, Copy } from 'react-feather';

export default function DomainRecon() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = async () => {
    if (!domain) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        const mockData = {
          domain,
          registrar: "GoDaddy.com, LLC",
          creationDate: "2010-05-10",
          expirationDate: "2025-05-10",
          updatedDate: "2023-04-15",
          nameServers: ["ns1.example.com", "ns2.example.com"],
          dnsRecords: {
            A: ["192.0.2.1", "192.0.2.2"],
            AAAA: ["2001:db8::1"],
            MX: [
              { priority: 10, value: "mail.example.com" },
              { priority: 20, value: "mail2.example.com" }
            ],
            TXT: ["v=spf1 include:_spf.example.com ~all"],
            NS: ["ns1.example.com", "ns2.example.com"]
          },
          sslInfo: {
            issuer: "Let's Encrypt",
            validFrom: "2023-05-01",
            validTo: "2024-05-01",
            protocol: "TLS 1.3"
          },
          status: "clientTransferProhibited",
          whois: `Domain Name: ${domain}
Registrar: GoDaddy.com, LLC
Creation Date: 2010-05-10
Expiration Date: 2025-05-10
Updated Date: 2023-04-15
Name Server: ns1.example.com
Name Server: ns2.example.com`
        };
        
        setResult(mockData);
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      setError('Failed to fetch domain information');
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.whois) {
      navigator.clipboard.writeText(result.whois);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (domain) {
      handleSearch();
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-500/10 p-3 rounded-xl">
            <Globe className="text-cyan-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Domain Recon
            </h1>
            <p className="text-gray-400 text-sm">
              Analyze domain registration and DNS records
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter domain (e.g. example.com)"
              className="w-full p-4 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Globe size={20} />
            </div>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                Scanning...
              </>
            ) : (
              <>
                <Search size={18} />
                Analyze
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-6 text-red-300">
            <div className="font-bold flex items-center gap-2">
              <Shield size={18} />
              Error
            </div>
            <p>{error}</p>
          </div>
        )}
        
        {loading && !error && (
          <div className="border border-cyan-500/20 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
              <Activity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400" size={24} />
            </div>
            <p className="text-cyan-400 font-medium">Scanning domain infrastructure</p>
            <p className="text-gray-500 text-sm">This may take a few seconds...</p>
          </div>
        )}
        
        {result && !loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  <Globe size={18} />
                  Domain Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400">Registrar</span>
                    <span className="font-mono">{result.registrar}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400">Created</span>
                    <span className="font-mono">{result.creationDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400">Expires</span>
                    <span className="font-mono">{result.expirationDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400">Updated</span>
                    <span className="font-mono">{result.updatedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-semibold">{result.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  <Server size={18} />
                  DNS Records
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-400 mb-1">Nameservers</h3>
                    <div className="space-y-1">
                      {result.nameServers.map((ns, i) => (
                        <div key={i} className="font-mono text-sm bg-gray-900/50 p-2 rounded">
                          {ns}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 mb-1">A Records</h3>
                    <div className="space-y-1">
                      {result.dnsRecords.A.map((ip, i) => (
                        <div key={i} className="font-mono text-sm bg-gray-900/50 p-2 rounded">
                          {ip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
              <h2 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Lock size={18} />
                SSL Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/30 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Issuer</div>
                  <div className="font-semibold">{result.sslInfo.issuer}</div>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Valid From</div>
                  <div className="font-semibold">{result.sslInfo.validFrom}</div>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Protocol</div>
                  <div className="font-semibold">{result.sslInfo.protocol}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                  <Shield size={18} />
                  Full WHOIS Data
                </h2>
                <button 
                  onClick={copyToClipboard}
                  className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-60">
                {result.whois}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800/30 border-t border-gray-700/30 p-4">
        <div className="flex items-center text-xs text-gray-500 gap-2">
          <Shield size={14} />
          <span>All scans are performed securely and no data is stored</span>
        </div>
      </div>
    </div>
  );
}