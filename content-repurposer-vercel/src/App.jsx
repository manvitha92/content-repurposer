import React, { useState, useEffect } from 'react';
import { Wand2, FileText, Twitter, Linkedin, Video, Image, Copy, Check, Trash2, History, Sparkles, Upload } from 'lucide-react';

export default function ContentRepurposer() {
  const [inputContent, setInputContent] = useState('');
  const [selectedFormats, setSelectedFormats] = useState(['tweet']);
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const formats = [
    { id: 'tweet', name: 'Twitter Thread', icon: Twitter, color: '#1DA1F2' },
    { id: 'linkedin', name: 'LinkedIn Post', icon: Linkedin, color: '#0A66C2' },
    { id: 'video', name: 'Video Script', icon: Video, color: '#FF0000' },
    { id: 'instagram', name: 'Instagram Caption', icon: Image, color: '#E4405F' }
  ];

  const tones = [
    { id: 'professional', name: 'Professional', emoji: '💼' },
    { id: 'casual', name: 'Casual', emoji: '😊' },
    { id: 'inspiring', name: 'Inspiring', emoji: '✨' },
    { id: 'educational', name: 'Educational', emoji: '📚' },
    { id: 'humorous', name: 'Humorous', emoji: '😄' }
  ];

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const keys = await window.storage.list('repurpose:');
      if (keys && keys.keys) {
        const historyItems = await Promise.all(
          keys.keys.slice(0, 10).map(async (key) => {
            try {
              const result = await window.storage.get(key);
              return result ? JSON.parse(result.value) : null;
            } catch {
              return null;
            }
          })
        );
        setHistory(historyItems.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.log('No history found yet');
    }
  };

  const toggleFormat = (formatId) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(f => f !== formatId)
        : [...prev, formatId]
    );
  };

  const repurposeContent = async () => {
    if (!inputContent.trim() || selectedFormats.length === 0) return;

    setIsLoading(true);
    setResults(null);

    try {
      const formatInstructions = selectedFormats.map(formatId => {
        const formatMap = {
          tweet: 'a Twitter thread (3-5 tweets, each under 280 characters, numbered, engaging hooks)',
          linkedin: 'a LinkedIn post (professional, 150-200 words, with line breaks for readability, include relevant hashtags)',
          video: 'a video script (with intro hook, main points with timestamps, and outro call-to-action)',
          instagram: 'an Instagram caption (engaging, 125-150 words, with emojis and relevant hashtags)'
        };
        return formatMap[formatId];
      }).join(', ');

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Transform the following content into ${formatInstructions}.

Tone: ${tone}

Original Content:
${inputContent}

Return ONLY a JSON object with this exact structure (no markdown, no preamble):
{
  "tweet": "...",
  "linkedin": "...",
  "video": "...",
  "instagram": "..."
}

Only include the formats I requested: ${selectedFormats.join(', ')}. Make each version unique and optimized for its platform.`
            }
          ],
        })
      });

      const data = await response.json();
      const textContent = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");

      const cleanJson = textContent.replace(/```json|```/g, "").trim();
      const parsedResults = JSON.parse(cleanJson);

      const formattedResults = selectedFormats.map(formatId => ({
        format: formatId,
        content: parsedResults[formatId] || "Content generation failed"
      }));

      setResults(formattedResults);

      // Save to history
      const historyItem = {
        id: `repurpose:${Date.now()}`,
        timestamp: Date.now(),
        originalContent: inputContent.substring(0, 200) + (inputContent.length > 200 ? '...' : ''),
        formats: selectedFormats,
        tone: tone,
        results: formattedResults
      };

      await window.storage.set(historyItem.id, JSON.stringify(historyItem));
      loadHistory();

    } catch (error) {
      console.error("Repurposing error:", error);
      alert("Failed to repurpose content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const loadFromHistory = (item) => {
    setInputContent(item.originalContent);
    setSelectedFormats(item.formats);
    setTone(item.tone);
    setResults(item.results);
    setShowHistory(false);
  };

  const clearHistory = async () => {
    if (!confirm('Clear all history?')) return;
    try {
      for (const item of history) {
        await window.storage.delete(item.id);
      }
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .format-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .format-card:hover {
          transform: translateY(-4px);
        }
        
        .result-card {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Sparkles size={40} color="#fff" style={{ animation: 'float 3s ease-in-out infinite' }} />
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '700',
            color: '#fff',
            margin: 0,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Content Repurposer
          </h1>
        </div>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'rgba(255,255,255,0.9)',
          fontWeight: '300',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Transform your content into multiple formats with AI magic ✨
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          {/* Input Section */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '600',
                color: '#1a202c',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FileText size={28} color="#667eea" />
                Original Content
              </h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: showHistory ? '#667eea' : '#f7fafc',
                  color: showHistory ? '#fff' : '#4a5568',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s'
                }}
              >
                <History size={18} />
                History
              </button>
            </div>

            {showHistory ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <p style={{ color: '#718096', margin: 0 }}>{history.length} saved items</p>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: '#feb2b2',
                        color: '#742a2a',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      <Trash2 size={16} />
                      Clear All
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => loadFromHistory(item)}
                      style={{
                        padding: '1rem',
                        background: '#f7fafc',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                      <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginBottom: '0.5rem' }}>
                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                      <div style={{ fontSize: '0.95rem', color: '#2d3748', marginBottom: '0.5rem' }}>
                        {item.originalContent}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {item.formats.map(f => (
                          <span key={f} style={{
                            padding: '0.25rem 0.75rem',
                            background: '#e6fffa',
                            color: '#234e52',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {formats.find(fmt => fmt.id === f)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <textarea
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Paste your blog post, article, or any content here..."
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '1.25rem',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    resize: 'vertical',
                    fontFamily: '"Space Mono", monospace',
                    lineHeight: '1.6',
                    background: '#f7fafc',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />

                {/* Format Selection */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2d3748', marginBottom: '1rem' }}>
                    Select Output Formats
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {formats.map((format) => {
                      const Icon = format.icon;
                      const isSelected = selectedFormats.includes(format.id);
                      return (
                        <div
                          key={format.id}
                          onClick={() => toggleFormat(format.id)}
                          className="format-card"
                          style={{
                            padding: '1.5rem',
                            background: isSelected ? format.color : '#fff',
                            color: isSelected ? '#fff' : '#2d3748',
                            border: `3px solid ${isSelected ? format.color : '#e2e8f0'}`,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontWeight: '600',
                            boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.05)'
                          }}
                        >
                          <Icon size={32} style={{ marginBottom: '0.75rem' }} />
                          <div style={{ fontSize: '1rem' }}>{format.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tone Selection */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2d3748', marginBottom: '1rem' }}>
                    Choose Tone
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {tones.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: tone === t.id ? '#667eea' : '#f7fafc',
                          color: tone === t.id ? '#fff' : '#4a5568',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '1rem',
                          transition: 'all 0.3s',
                          boxShadow: tone === t.id ? '0 8px 20px rgba(102, 126, 234, 0.4)' : 'none'
                        }}
                      >
                        {t.emoji} {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={repurposeContent}
                  disabled={isLoading || !inputContent.trim() || selectedFormats.length === 0}
                  style={{
                    marginTop: '2rem',
                    width: '100%',
                    padding: '1.25rem',
                    background: isLoading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s',
                    transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                  }}
                >
                  <Wand2 size={24} style={{ animation: isLoading ? 'float 1s ease-in-out infinite' : 'none' }} />
                  {isLoading ? 'Repurposing Magic in Progress...' : 'Transform Content'}
                </button>
              </>
            )}
          </div>

          {/* Results Section */}
          {results && !showHistory && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Sparkles size={28} color="#667eea" />
                Repurposed Content
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {results.map((result, index) => {
                  const format = formats.find(f => f.id === result.format);
                  const Icon = format.icon;
                  return (
                    <div
                      key={index}
                      className="result-card"
                      style={{
                        padding: '1.75rem',
                        background: '#f7fafc',
                        borderRadius: '16px',
                        border: `3px solid ${format.color}`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Icon size={24} color={format.color} />
                          <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: '600',
                            color: format.color,
                            margin: 0
                          }}>
                            {format.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.content, index)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: copiedIndex === index ? '#48bb78' : format.color,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            transition: 'all 0.3s'
                          }}
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={16} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: '#2d3748',
                        whiteSpace: 'pre-wrap',
                        fontFamily: '"Space Mono", monospace',
                        background: '#fff',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0'
                      }}>
                        {result.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '4rem',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.95rem'
      }}>
        <p>Built with Claude AI • Transform once, publish everywhere 🚀</p>
      </div>
    </div>
  );
}
