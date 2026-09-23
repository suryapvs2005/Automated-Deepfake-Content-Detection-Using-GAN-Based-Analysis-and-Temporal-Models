import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, ScanLine, FileType } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadZone = ({ onFileSelect, selectedFile, onClear, accept, type }) => {
    const [isHovering, setIsHovering] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {selectedFile ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full p-8 border border-slate-700 bg-slate-900 rounded-2xl flex flex-col items-center justify-center overflow-hidden"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-all z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative h-16 w-16 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 border border-teal-500/20">
                            <File className="w-8 h-8 text-teal-400" />
                        </div>

                        <h3 className="text-lg font-medium text-white mb-2 truncate max-w-[80%]">
                            {selectedFile.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                            <span className="bg-slate-800 px-2 py-1 rounded">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                            <span className="bg-slate-800 px-2 py-1 rounded uppercase">{type}</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        {...getRootProps()}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`relative min-h-[300px] w-full flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer
                        ${isDragActive
                                ? 'border-teal-500 bg-teal-500/5'
                                : 'border-slate-700 bg-transparent hover:bg-slate-800/30 hover:border-slate-600'
                            }`}
                    >
                        <input {...getInputProps()} />

                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                                <UploadCloud className={`w-8 h-8 transition-colors ${isDragActive ? 'text-teal-400' : 'text-slate-400'}`} />
                            </div>

                            <h4 className="text-lg font-bold text-white mb-2">
                                Drag and drop your file here
                            </h4>
                            <p className="text-slate-500 text-sm mb-4">
                                or <span className="text-teal-400 hover:underline">click to browse</span> from your device
                            </p>
                            <p className="text-xs text-slate-600">
                                Supports images, audio, video, and text files
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UploadZone;
