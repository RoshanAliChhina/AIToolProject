import React, { useState } from 'react';
import { X, Plus, Trash2, Wrench, Tag, FileText, Image, Link, DollarSign, Lightbulb } from 'lucide-react';

const ToolForm = ({ isOpen, onClose, onSubmit, initialData = null, title = 'Add New Tool' }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        category: '',
        description: '',
        image: '',
        link: '',
        pricing: 'Free',
        features: [{ name: '', description: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, field, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index][field] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, { name: '', description: '' }]
        }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-10 overflow-hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-all duration-500"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-white dark:bg-slate-950 rounded-[40px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] max-w-4xl w-full border border-slate-200/60 dark:border-slate-800/50 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -z-10" />

                {/* Header */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-100 dark:border-slate-800/50">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {title}
                        </h3>
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure Tool Details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-100 dark:hover:border-rose-900 transition-all duration-300"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
                    <form id="toolForm" onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-extrabold ">
                            {/* Tool Name */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <Wrench className="w-3.5 h-3.5" />
                                    Tool Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                    placeholder="e.g., Creative Assistant Pro"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <Tag className="w-3.5 h-3.5" />
                                    Category
                                </label>
                                <div className="relative group">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {[
                                            "All", "Writing", "Coding", "IDE", "Developer Tools", "No-Code", "Low-Code",
                                            "Design", "UI/UX", "Image", "Video", "Audio", "Voice", "Music", "Animation", "3D",
                                            "Marketing", "SEO", "Social Media", "Advertising", "Business", "Sales", "CRM",
                                            "Customer Support", "Chatbot", "AI Models", "LLMs", "Productivity", "Automation",
                                            "Workflow", "Research", "Data", "Data Analysis", "Data Visualization", "Analytics",
                                            "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Education",
                                            "E-Learning", "Tutoring", "Finance", "Accounting", "Trading", "Crypto", "Health",
                                            "Medical", "Fitness", "Legal", "HR", "Recruitment", "Resume", "E-commerce",
                                            "Shopping", "Pricing", "Gaming", "Game Dev", "AR/VR", "Security", "Cybersecurity",
                                            "Testing", "QA", "Monitoring", "Cloud", "DevOps", "API", "Integrations", "Utilities",
                                            "Extensions", "Browser Tools", "Mobile Apps", "Desktop Apps", "Open Source", "Startup", "Other"
                                        ].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    Pricing Model
                                </label>
                                <div className="relative group">
                                    <select
                                        name="pricing"
                                        value={formData.pricing}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Free">Free</option>
                                        <option value="Freemium">Freemium</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <Image className="w-3.5 h-3.5" />
                                    Brand Logo URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                    placeholder="https://icon.com/logo.png"
                                />
                            </div>
                        </div>

                        {/* Website URL - Full Width */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <Link className="w-3.5 h-3.5" />
                                Platform Link
                            </label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                placeholder="https://webapp.ai"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <FileText className="w-3.5 h-3.5" />
                                Profile Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-[15px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-300"
                                placeholder="Highlight the core value proposition..."
                            />
                        </div>

                        {/* Features Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2.5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                    Key Features
                                </label>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="px-4 py-2 flex items-center gap-2 text-[12px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-all group"
                                >
                                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                    ADD CAPABILITY
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="relative group/feature p-6 rounded-[24px] border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 transition-all hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-white dark:hover:bg-slate-900">
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-4">
                                                <input
                                                    type="text"
                                                    value={feature.name}
                                                    onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                                                    placeholder="Feature Heading"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-[14px] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all tracking-tight"
                                                />
                                                <input
                                                    type="text"
                                                    value={feature.description}
                                                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                    placeholder="Brief Capability Details"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 dark:text-white font-bold text-[13px] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                                />
                                            </div>
                                            {formData.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all opacity-0 group-hover/feature:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-10 py-8 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-8 py-4 rounded-[18px] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black text-[13px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                    >
                        Discard Changes
                    </button>
                    <button
                        form="toolForm"
                        type="submit"
                        className="flex-[2] px-8 py-4 rounded-[18px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[13px] uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-900/5 dark:shadow-white/5"
                    >
                        Commit & Deploy Tool
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToolForm;
