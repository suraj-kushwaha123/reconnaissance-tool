'use client';

import { useState, useRef } from 'react';
import { Globe, Search, Copy, Server, Activity, Zap, Shield } from 'react-feather';

export default function SubdomainScan() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [subdomains, setSubdomains] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  const startProgressSimulation = () => {
    clearInterval(progressInterval.current);
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval.current);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
  };

  const fetchSubdomains = async () => {
    setLoading(true);
    setError('');
    setSubdomains([]);
    startProgressSimulation();

    try {
      const res = await fetch('/api/subdomains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error fetching subdomains');
      setSubdomains(data.subdomains);
      
      // Complete progress animation
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      clearInterval(progressInterval.current);
    }
  };

  const copyToClipboard = () => {
    const text = subdomains.map(s => s.host).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-cyan-500/10 p-3 rounded-xl">
            <Server className="text-cyan-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Subdomain Scanner
            </h1>
            <p className="text-gray-400 text-sm">
              Discover all subdomains associated with a domain
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
              onKeyDown={(e) => e.key === 'Enter' && fetchSubdomains()}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Globe size={20} />
            </div>
          </div>
          
          <button
            onClick={fetchSubdomains}
            disabled={loading || !domain}
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
                Scan
              </>
            )}
          </button>
        </div>
        
        {loading && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Scanning subdomains</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-6 text-red-300">
            <div className="font-bold flex items-center gap-2">
              <Shield size={18} />
              Error
            </div>
            <p>{error}</p>
          </div>
        )}
        
        {subdomains.length > 0 && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="text-cyan-400" size={20} />
                <span>
                  Found <span className="text-cyan-400">{subdomains.length}</span> subdomains
                </span>
              </h2>
              <button 
                onClick={copyToClipboard}
                className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-900/50 text-gray-400 text-sm font-medium border-b border-gray-700">
                <div className="col-span-8">Subdomain</div>
                <div className="col-span-4">IP Address</div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {subdomains.map((sub, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700/50 last:border-0 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="col-span-8 font-mono text-cyan-300">{sub.host}</div>
                    <div className="col-span-4 font-mono text-gray-300">{sub.ip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!loading && subdomains.length === 0 && !error && (
          <div className="border border-cyan-500/20 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5 rounded-full">
              <Search className="text-cyan-400" size={36} />
            </div>
            <h3 className="text-xl font-semibold">Scan for Subdomains</h3>
            <p className="text-gray-500 max-w-md">
              Enter a domain name to discover all associated subdomains. Our scanner will search for common subdomains and expose hidden services.
            </p>
            <div className="mt-4 flex gap-2 text-xs">
              <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">www</div>
              <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">mail</div>
              <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">api</div>
              <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">dev</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800/30 border-t border-gray-700/30 p-4">
        <div className="flex items-center text-xs text-gray-500 gap-2">
          <Shield size={14} />
          <span>Scan results are processed in real-time and never stored</span>
        </div>
      </div>
    </div>
  );
}