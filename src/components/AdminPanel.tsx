import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  Share2, 
  Layers, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Copy
} from 'lucide-react';
import { Article } from '../types/news';
import { IMAGE_PRESETS } from '../data/sampleArticles';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  categories: string[];
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onLoadSamples: () => void;
  onClearAll: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  articles,
  categories,
  onSaveArticle,
  onDeleteArticle,
  onAddCategory,
  onDeleteCategory,
  onLoadSamples,
  onClearAll,
}) => {
  const [activeTab, setActiveTab] = useState<'publish' | 'manage' | 'categories'>('publish');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0] || 'DDS Expo AI');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [author, setAuthor] = useState('DDS News Editorial Bureau');
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  // Category State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Status message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  if (!isOpen) return null;

  // File Upload Handler (FileReader to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setStatusMessage('Image successfully uploaded and ready!');
        setTimeout(() => setStatusMessage(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pre-fill DDS Expo AI Template
  const handleLoadTemplate = () => {
    setTitle('DDS Expo AI 2026 Summit Unveils Next-Gen Autonomous Agents and Enterprise Architecture');
    setCategory('DDS Expo AI');
    setSummary('The DDS Expo AI flagship keynote brought together global tech pioneers to demonstrate sub-100ms multi-agent reasoning, self-healing code systems, and decentralized inferencing.');
    setContent(`The global technology landscape witnessed a major inflection point today at DDS Expo AI 2026. The summit kicked off with keynote revelations focusing on autonomous multi-agent workflows, unified foundation models, and scalable edge computing architectures.

Industry leaders demonstrated how next-generation agents move beyond simple conversational bots to fully autonomous task orchestration. These systems can analyze real-time streaming telemetry, orchestrate cross-platform pipelines, and generate validated production code in seconds.

"The goal of DDS Expo AI is to make bleeding-edge AI models practical, observable, and secure for modern engineering teams," noted the keynote dispatch. "We are seeing the transition from experimental prototypes into resilient enterprise engines that solve complex real-world workflows."`);
    setImageUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80');
    setImageCaption('DDS Expo AI Keynote stage and developer showcase');
    setHighlights([
      'Sub-100ms cognitive reasoning latency demonstrated on live stage',
      'Autonomous multi-agent orchestration for enterprise workflows',
      'Unified open tooling architecture to eliminate vendor lock-in'
    ]);
    setIsFeatured(true);
    setIsBreaking(true);
    setStatusMessage('DDS Expo AI template loaded into form!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSummary('');
    setContent('');
    setImageUrl('');
    setImageCaption('');
    setHighlights(['']);
    setIsFeatured(false);
    setIsBreaking(false);
  };

  // Edit existing article
  const handleStartEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary);
    setContent(article.content);
    setImageUrl(article.imageUrl);
    setImageCaption(article.imageCaption || '');
    setAuthor(article.author);
    setHighlights(article.highlights && article.highlights.length > 0 ? article.highlights : ['']);
    setIsFeatured(!!article.isFeatured);
    setIsBreaking(!!article.isBreaking);
    setActiveTab('publish');
  };

  // Submit Article
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide at least a title and article content.');
      return;
    }

    const cleanedHighlights = highlights.filter((h) => h.trim().length > 0);
    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';

    const newArticle: Article = {
      id: editingId || 'art-' + Date.now(),
      title: title.trim(),
      category: category || 'DDS Expo AI',
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      imageUrl: finalImage,
      imageCaption: imageCaption.trim() || undefined,
      author: author.trim() || 'DDS News Bureau',
      publishedAt: editingId ? 'Updated just now' : 'Just now',
      readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 150))} min read`,
      highlights: cleanedHighlights.length > 0 ? cleanedHighlights : undefined,
      isFeatured,
      isBreaking,
      views: editingId ? (articles.find(a => a.id === editingId)?.views || 10) : 1,
      likes: editingId ? (articles.find(a => a.id === editingId)?.likes || 0) : 0,
      comments: editingId ? (articles.find(a => a.id === editingId)?.comments || []) : []
    };

    onSaveArticle(newArticle);
    setStatusMessage(editingId ? 'Article successfully updated!' : 'Article published live to DDS News!');
    resetForm();
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 1200);
  };

  // Copy Social Text
  const copySocialText = (channel: 'twitter' | 'linkedin' | 'whatsapp') => {
    const textTitle = title || 'DDS News Update';
    const textSummary = summary || 'Latest technology release from DDS News.';
    let copyPayload = '';

    if (channel === 'twitter') {
      copyPayload = `🚀 ${textTitle}\n\n${textSummary}\n\nRead more on DDS News: #DDSNews #DDSExpoAI #AI #TechUpdate`;
    } else if (channel === 'linkedin') {
      copyPayload = `Technology Briefing: ${textTitle}\n\n${textSummary}\n\nKey takeaways published on DDS News. Access the complete technical dispatch here: [Link]`;
    } else {
      copyPayload = `*DDS News Bulletin*\n\n📌 *${textTitle}*\n${textSummary}\n\nRead full story on DDS News`;
    }

    navigator.clipboard.writeText(copyPayload);
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs">
              CMS
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>DDS News — Editorial Admin Desk</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded-full font-semibold">
                  Admin Only
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Publish articles, upload images, manage categories, and distribute to social media.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab('publish')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'publish'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{editingId ? 'Edit Article' : 'Publish Article'}</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'manage'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Manage Articles ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'categories'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>
          </div>

          {/* Quick Demo Utilities for CEO showcase */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onLoadSamples}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded bg-blue-50 border border-blue-100"
              title="Populate portal with sample tech stories for CEO preview"
            >
              + Load Sample Stories
            </button>
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold px-2 py-1 rounded hover:bg-red-50"
              title="Return to completely empty portal"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2.5 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {/* TAB 1: PUBLISH ARTICLE FORM */}
          {activeTab === 'publish' && (
            <form onSubmit={handlePublish} className="space-y-6">
              {/* Template Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50/70 border border-blue-100 rounded-2xl gap-3">
                <div>
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Quick Template: DDS Expo AI
                  </h4>
                  <p className="text-xs text-blue-700">
                    Instantly pre-fill a complete keynote release with autonomous agents highlights and photo.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadTemplate}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition whitespace-nowrap cursor-pointer"
                  >
                    ⚡ Load DDS Expo AI Template
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DDS Expo AI Unveils Next-Generation Multi-Agent Systems"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Summary / Standfirst (1-2 sentences)
                </label>
                <textarea
                  rows={2}
                  placeholder="A concise summary of the tech announcement or article..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Image & Media Upload Station */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>Article Cover Image</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Upload file, paste URL, or pick from presets
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Option */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 bg-white rounded-xl p-4 text-center cursor-pointer transition">
                    <label className="cursor-pointer block">
                      <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-xs font-semibold text-slate-800 block">
                        Upload Image from Computer
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        PNG, JPG, WEBP (instant preview)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Direct URL Input */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                    <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                      Or Paste Image Web URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Preset Picks */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Quick Curated Tech Presets
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setImageUrl(preset.url);
                          setImageCaption(preset.caption);
                        }}
                        className={`text-left p-2 rounded-lg border text-xs transition cursor-pointer flex items-center gap-2 ${
                          imageUrl === preset.url
                            ? 'border-blue-500 bg-blue-50 font-bold text-blue-700'
                            : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <img 
                          src={preset.url} 
                          alt="" 
                          className="w-6 h-6 rounded object-cover shrink-0" 
                        />
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Thumbnail if selected */}
                {imageUrl && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800">Image Ready</p>
                      <input
                        type="text"
                        placeholder="Image caption / photo credits..."
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        className="w-full text-xs text-slate-600 bg-transparent border-b border-slate-200 outline-none mt-0.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Main Body Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Article Body Content *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write the full technology article or paste content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none leading-relaxed"
                />
              </div>

              {/* Highlights list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Highlights (Bullet Points)
                  </label>
                  <button
                    type="button"
                    onClick={() => setHighlights([...highlights, ''])}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Highlight</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Key highlight #${i + 1}`}
                        value={h}
                        onChange={(e) => {
                          const updated = [...highlights];
                          updated[i] = e.target.value;
                          setHighlights(updated);
                        }}
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                      />
                      {highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))}
                          className="p-1.5 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Byline and Flags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Author / Byline
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Feature as Top Hero Story</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                    />
                    <span>Mark as Breaking News</span>
                  </label>
                </div>
              </div>

              {/* Social Media Sharing Hub Preview */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-blue-600" />
                    <span>Social Media Auto-Post Copy</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Click to copy formatted post for your social handles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => copySocialText('twitter')}
                    className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">X / Twitter</span>
                      <span className="text-[10px] text-slate-500">Includes #DDSExpoAI tags</span>
                    </div>
                    {copiedChannel === 'twitter' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => copySocialText('linkedin')}
                    className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">LinkedIn Brief</span>
                      <span className="text-[10px] text-slate-500">Executive summary</span>
                    </div>
                    {copiedChannel === 'linkedin' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => copySocialText('whatsapp')}
                    className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">WhatsApp Alert</span>
                      <span className="text-[10px] text-slate-500">Bulleted message</span>
                    </div>
                    {copiedChannel === 'whatsapp' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Update Article' : 'Publish to DDS News'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE ARTICLES */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Published Articles ({articles.length})
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('publish');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New</span>
                </button>
              </div>

              {articles.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-sm font-semibold text-slate-800 mb-1">No articles published yet</p>
                  <p className="text-xs text-slate-500 mb-4">Click "Publish Article" to create your first tech story.</p>
                  <button
                    onClick={onLoadSamples}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                  >
                    Load Sample Tech Stories
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {articles.map((art) => (
                    <div 
                      key={art.id}
                      className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-blue-200 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={art.imageUrl} 
                          alt="" 
                          className="w-16 h-12 rounded-lg object-cover shrink-0" 
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 truncate max-w-md mt-0.5">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            By {art.author} • {art.publishedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleStartEdit(art)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-xs flex items-center gap-1 font-semibold transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => onDeleteArticle(art.id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1 font-semibold transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Add New Tech Category
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Quantum Computing, Robotics, Startups..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        onAddCategory(newCategoryName.trim());
                        setNewCategoryName('');
                        setStatusMessage('Category added successfully!');
                        setTimeout(() => setStatusMessage(null), 2500);
                      }
                    }}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Active Channels &amp; Categories ({categories.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div 
                      key={cat}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800">{cat}</span>
                      {categories.length > 1 && (
                        <button
                          onClick={() => onDeleteCategory(cat)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                          title="Remove category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
