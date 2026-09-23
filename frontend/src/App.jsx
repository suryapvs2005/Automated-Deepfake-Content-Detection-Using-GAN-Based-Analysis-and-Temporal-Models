import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import CyberBackground from './components/CyberBackground';
import { Video, Mic, FileText, Image as ImageIcon, ShieldCheck, Zap, Lock, Cpu, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:8000';

function App() {
  const [activeTab, setActiveTab] = useState('image');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/analyze/${activeTab}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Analysis failed. Please try again or check the backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const tabIcons = {
    image: <ImageIcon className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    audio: <Mic className="w-4 h-4" />,
    text: <FileText className="w-4 h-4" />,
  };

  return (
    <div className="relative min-h-screen text-slate-50 selection:bg-teal-500/30 font-sans scroll-smooth">
      <CyberBackground />
      <Header />

      <main className="pt-24">

        {/* HERO SECTION */}
        <section className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Advanced AI Detection System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Detect <span className="text-teal-400">Deepfakes</span><br />
            with <span className="text-teal-400">Explainable AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10"
          >
            Upload images, audio, video, or text. Our multimodal AI analyzes content and explains exactly why it's flagged as real or fake.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#analyze" className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2">
              Start Analyzing <Zap className="w-4 h-4" />
            </a>
            <a href="#how-it-works" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-all flex items-center justify-center">
              Learn How It Works
            </a>
          </motion.div>
        </section>

        {/* ANALYZE SECTION */}
        <section id="analyze" className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Analyze Your Content</h2>
            <p className="text-slate-400">Upload any media file and our AI will detect manipulations</p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-1 backdrop-blur-sm">
            {/* Tabs */}
            <div className="flex justify-center p-6 pb-0">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {['image', 'video', 'audio', 'text'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setActiveTab(type); handleClear(); }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${activeTab === type
                        ? 'bg-slate-800 text-teal-400 border-teal-500/30'
                        : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/50'
                      }`}
                  >
                    {tabIcons[type]}
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <UploadZone
                type={activeTab}
                selectedFile={file}
                onFileSelect={handleFileSelect}
                onClear={handleClear}
                accept={
                  activeTab === 'image' ? { 'image/*': [] } :
                    activeTab === 'video' ? { 'video/*': [] } :
                      activeTab === 'audio' ? { 'audio/*': [] } :
                        { 'text/plain': [], 'application/pdf': [] }
                }
              />

              {/* Action Button */}
              {file && !loading && !result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-center"
                >
                  <button
                    onClick={handleAnalyze}
                    className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
                  >
                    Analyze {activeTab} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-center font-mono text-sm">
                  [ERROR]: {error}
                </div>
              )}

              {/* Results */}
              <ResultCard loading={loading} result={result} />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="container mx-auto px-4 py-20 border-t border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-teal-400 mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our explainable AI pipeline ensures transparency at every step of the detection process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Upload Content', desc: 'Drag and drop any image, audio, video, or text file into our secure analyzer.', icon: <ArrowRight className="w-5 h-5" /> },
              { title: 'AI Processing', desc: 'Our multimodal neural networks analyze the content for manipulation signatures.', icon: <Cpu className="w-5 h-5" /> },
              { title: 'Artifact Detection', desc: 'Advanced algorithms identify inconsistencies, anomalies, and synthetic patterns.', icon: <ShieldCheck className="w-5 h-5" /> },
              { title: 'Detailed Report', desc: 'Receive a comprehensive verdict with confidence scores and explainable findings.', icon: <FileText className="w-5 h-5" /> }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-teal-500/30 transition-colors relative group">
                <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-bold border-4 border-[#020617]">
                  {idx + 1}
                </div>
                <div className="mt-4 mb-4 p-3 bg-slate-800 w-fit rounded-lg text-teal-400 group-hover:bg-teal-500/10 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-teal-400 mb-4">Powerful Detection Features</h2>
            <p className="text-slate-400">Multi-modal AI analysis powered by cutting-edge deep learning architectures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Image Detection', desc: 'CNN & Vision Transformer models detect facial inconsistencies, GAN artifacts, and unnatural patterns.', icon: <ImageIcon /> },
              { title: 'Audio Analysis', desc: 'Spectrogram analysis reveals voice cloning, splicing, and synthetic speech signatures.', icon: <Mic /> },
              { title: 'Video Forensics', desc: 'Temporal models (CNN+LSTM) detect frame-level manipulations and motion inconsistencies.', icon: <Video /> },
              { title: 'Text Verification', desc: 'NLP transformers identify AI-generated content, style anomalies, and linguistic patterns.', icon: <FileText /> },
              { title: 'Explainable AI', desc: 'Every detection comes with human-readable explanations of why content was flagged.', icon: <Cpu /> },
              { title: 'High Accuracy', desc: 'State-of-the-art models trained on diverse datasets for reliable real-world detection.', icon: <ShieldCheck /> },
              { title: 'Fast Processing', desc: 'Optimized inference pipeline delivers results in seconds, not minutes.', icon: <Zap /> },
              { title: 'Privacy First', desc: 'Your files are processed securely and never stored after analysis is complete.', icon: <Lock /> },
            ].map((feat, idx) => (
              <div key={idx} className="bg-slate-900/30 p-8 rounded-xl border border-slate-800 hover:bg-slate-900/60 hover:border-teal-500/20 transition-all group">
                <div className="mb-4 text-teal-500 group-hover:text-teal-400 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; 2026 TruthLens AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
