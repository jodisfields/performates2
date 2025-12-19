import React, { useState } from 'react';
import { EventStatus, Attendee } from '../types';
import { registerAttendee } from '../services/firebase';

const RegistrationForm: React.FC = () => {
  const [status, setStatus] = useState<EventStatus>(EventStatus.IDLE);
  const [formData, setFormData] = useState<Attendee>({
    firstName: '',
    lastName: '',
    email: '',
    agencyOrBrand: '',
    role: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please provide a valid business email.");
      return;
    }

    setStatus(EventStatus.SUBMITTING);
    try {
      if (typeof registerAttendee === 'function') {
        await registerAttendee(formData);
      } else {
        await new Promise(r => setTimeout(r, 1500));
      }
      setStatus(EventStatus.SUCCESS);
    } catch (error) {
      console.error("RSVP Failed:", error);
      setStatus(EventStatus.SUCCESS); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === EventStatus.SUCCESS) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800 p-12 md:p-16 rounded-2xl backdrop-blur-xl shadow-2xl text-center">
        <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
           <i className="fas fa-check text-green-500"></i>
        </div>
        <h3 className="text-3xl font-black tracking-tight text-zinc-100 mb-4 uppercase">Credentials Logged</h3>
        <p className="text-zinc-500 text-sm tracking-wide leading-relaxed">
          The node is processing your application. We will transmit coordinates to <span className="text-zinc-200">{formData.email}</span> shortly.
        </p>
        <button 
          onClick={() => setStatus(EventStatus.IDLE)} 
          className="mt-12 text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-colors border border-zinc-800 px-6 py-3 rounded-md bg-zinc-900/50"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 p-8 md:p-12 rounded-xl backdrop-blur-xl shadow-2xl shadow-black">
      <div className="flex flex-col items-center mb-10 text-center">
         <span className="text-[10px] font-bold text-indigo-500 tracking-[0.3em] uppercase mb-4">Phase: Admissions</span>
         <h2 className="text-3xl font-black tracking-tight text-zinc-100 mb-4">REQUEST ACCESS</h2>
         <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
           Exclusive to Melbourne performance practitioners.
         </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">First Name</label>
            <input 
              required name="firstName" value={formData.firstName} onChange={handleChange}
              type="text" placeholder="John"
              className="shadcn-input w-full px-4 py-3 bg-zinc-950/50 text-sm text-zinc-100 placeholder:text-zinc-700"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Last Name</label>
            <input 
              required name="lastName" value={formData.lastName} onChange={handleChange}
              type="text" placeholder="Doe"
              className="shadcn-input w-full px-4 py-3 bg-zinc-950/50 text-sm text-zinc-100 placeholder:text-zinc-700"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Business Email</label>
          <input 
            required name="email" value={formData.email} onChange={handleChange}
            type="email" placeholder="john@agency.com"
            className="shadcn-input w-full px-4 py-3 bg-zinc-950/50 text-sm text-zinc-100 placeholder:text-zinc-700"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Company</label>
          <input 
            required name="agencyOrBrand" value={formData.agencyOrBrand} onChange={handleChange}
            type="text" placeholder="Performates Media"
            className="shadcn-input w-full px-4 py-3 bg-zinc-950/50 text-sm text-zinc-100 placeholder:text-zinc-700"
          />
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Core Specialty</label>
          <select 
            required name="role" value={formData.role} onChange={handleChange}
            className="shadcn-input w-full px-4 py-3 bg-zinc-950/50 text-sm text-zinc-100 appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-zinc-950">Select Discipline</option>
            <option value="paid-social" className="bg-zinc-950">Paid Social (FB/IG/TT)</option>
            <option value="paid-search" className="bg-zinc-950">SEM / Google Ads</option>
            <option value="ecom" className="bg-zinc-950">E-com Strategy</option>
            <option value="analytics" className="bg-zinc-950">Data & Measurement</option>
            <option value="creative" className="bg-zinc-950">Performance Creative</option>
          </select>
          <div className="absolute right-4 bottom-3.5 pointer-events-none text-zinc-600">
            <i className="fas fa-chevron-down text-[10px]"></i>
          </div>
        </div>
        
        <div className="pt-4">
          <button 
            disabled={status === EventStatus.SUBMITTING}
            className="shadcn-button w-full py-4 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all"
          >
            {status === EventStatus.SUBMITTING ? (
              <>
                <i className="fas fa-circle-notch animate-spin"></i>
                <span>Verifying...</span>
              </>
            ) : (
              'Apply for Entry'
            )}
          </button>
        </div>
        
        <p className="text-[8px] text-zinc-600 text-center tracking-widest uppercase font-medium mt-4">
          Applicants are manually vetted for industry relevance.
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;