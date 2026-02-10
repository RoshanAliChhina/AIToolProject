import React from 'react';
import { Cpu, Users, Target, ShieldCheck, Sparkles, Zap, CheckCircle, Globe } from 'lucide-react';

const About = () => {
    return (
        <div className="py-4 animate-in fade-in duration-700 relative overflow-hidden bg-transparent transition-colors min-h-screen">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Hero Section */}
                <header className="text-center mb-24">
                    <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold mb-6 animate-bounce">
                        <Sparkles className="w-4 h-4" />
                        <span>Reshaping the Future</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight dark:text-white leading-tight">
                        Empowering Developers with <br />
                        <span className="text-accent">Intelligent Tools</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
                        AI Tools Hub is your curated gateway to the most powerful, free, and open-source AI resources. We filter the noise so you can build the future.
                    </p>
                </header>

                {/* Our Story & Visual */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8 px-6 lg:px-10">
                        <h2 className="text-3xl font-bold dark:text-white flex items-center">
                            <Zap className="w-6 h-6 text-accent mr-3 fill-accent" />
                            Our Mission
                        </h2>
                        <div className="prose dark:prose-invert text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                            <p>
                                In the rapidly evolving landscape of today, keeping track of every new AI model and tool is impossible. We observed that developers were spending more time <em>searching</em> for tools than <em>building</em> with them.
                            </p>
                            <p>
                                We established a rigorous testing protocol. We spent hundreds of hours testing APIs, SDKs, and platforms to ensure only the most productive, developer-friendly, and truly "free" tools make it to our directory.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Trusted by 50k+ devs</span>
                        </div>
                    </div>

                    {/* Visual Grid */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-20 rounded-full"></div>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            {[
                                { icon: Cpu, label: "Performance", color: "text-accent", bg: "bg-accent/10" },
                                { icon: ShieldCheck, label: "Security", color: "text-accent", bg: "bg-accent/10" },
                                { icon: Globe, label: "Accessibility", color: "text-accent", bg: "bg-accent/10" },
                                { icon: Target, label: "Accuracy", color: "text-accent", bg: "bg-accent/10" },
                            ].map((item, index) => (
                                <div key={index} className={`p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl flex flex-col items-center text-center space-y-3 transform transition-all duration-300 hover:scale-105 ${index % 2 === 1 ? 'mt-8' : ''}`}>
                                    <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats / Values Grid (Glassmorphism) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Users, title: "50k+ Users", desc: "Monthly active developers." },
                        { icon: CheckCircle, title: "100% Curated", desc: "Manually tested tools." },
                        { icon: ShieldCheck, title: "Privacy First", desc: "Verified terms of service." }
                    ].map((stat, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-accent/10"></div>
                            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-2xl mb-3 dark:text-white">{stat.title}</h3>
                            <p className="text-gray-500 dark:text-gray-300 font-medium">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
