import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submissionService } from '../services/submissionService';
import { trackFormSubmission } from '../utils/analytics';
import LoadingSpinner from '../components/LoadingSpinner';

const Submit = () => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        category: 'Productivity',
        image: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const result = await submissionService.add(formData);
            if (result.success) {
                trackFormSubmission('submit_tool', true);
                setSubmitted(true);
                setFormData({ name: '', url: '', description: '', category: 'Productivity', image: '' });
            }
        } catch (error) {
            trackFormSubmission('submit_tool', false);
            setError('Failed to submit. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-12 min-h-screen bg-transparent animate-in fade-in duration-500 relative overflow-hidden transition-colors">

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight dark:text-white">Submit a <span className="text-accent">Tool</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Know an amazing AI tool? Share it with the community!
                    </p>
                </header>

                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700">
                    {submitted ? (
                        <div className="text-center py-10 animate-in zoom-in duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Your submission has been received and is under review.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-accent font-semibold hover:underline"
                            >
                                Submit another tool
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tool Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white placeholder-gray-400"
                                        placeholder="e.g. ChatGPT"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="url" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Website URL</label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        required
                                        value={formData.url}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white placeholder-gray-400"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white appearance-none cursor-pointer"
                                    >
                                        <option>Productivity</option>
                                        <option>Design</option>
                                        <option>Coding</option>
                                        <option>Writing</option>
                                        <option>Video</option>
                                        <option>Audio</option>
                                        <option>Other</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white resize-none placeholder-gray-400"
                                    placeholder="Briefly describe what this tool does..."
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white placeholder-gray-400"
                                    placeholder="https://example.com/image.png"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group transform disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Tool
                                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Submit;
