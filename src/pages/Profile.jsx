import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatDate';
import { User, Mail, Shield, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Title Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Account</h2>
        <p className="text-sm text-gray-400">View your active session details, platform access privileges, and profile settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl md:col-span-1 border border-gray-800/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
          
          <div className="h-20 w-20 rounded-full bg-[#121826]/40 border-2 border-emerald-500/30 flex items-center justify-center text-3xl font-extrabold text-emerald-400 uppercase shadow-lg shadow-emerald-500/5">
            {user?.name ? user.name[0] : <User className="h-10 w-10" />}
          </div>
          
          <h4 className="mt-4 font-bold text-gray-200 text-lg leading-tight">{user?.name || 'Administrator'}</h4>
          <span className="mt-1 text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Developer / Admin
          </span>
        </div>

        {/* Profile Details Details */}
        <div className="glass p-6 md:p-8 rounded-2xl shadow-xl md:col-span-2 border border-gray-800/40 space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Identity Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
            {/* Full Name */}
            <div className="space-y-1.5">
              <span className="text-gray-500 block">Full Name</span>
              <div className="flex items-center gap-2.5 text-gray-200 bg-[#121826]/30 border border-gray-800/60 p-3 rounded-xl">
                <User className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{user?.name || 'Administrator'}</span>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <span className="text-gray-500 block">Email Address</span>
              <div className="flex items-center gap-2.5 text-gray-200 bg-[#121826]/30 border border-gray-800/60 p-3 rounded-xl">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="truncate">{user?.email || 'admin@inventory.com'}</span>
              </div>
            </div>

            {/* Account Role */}
            <div className="space-y-1.5">
              <span className="text-gray-500 block">Security Privileges</span>
              <div className="flex items-center gap-2.5 text-gray-200 bg-[#121826]/30 border border-gray-800/60 p-3 rounded-xl">
                <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Super Administrator</span>
              </div>
            </div>

            {/* Account Creation Date */}
            <div className="space-y-1.5">
              <span className="text-gray-500 block">Member Since</span>
              <div className="flex items-center gap-2.5 text-gray-200 bg-[#121826]/30 border border-gray-800/60 p-3 rounded-xl">
                <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{user?.createdAt ? formatDate(user.createdAt) : formatDate(new Date())}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800/40 flex items-center gap-2.5 text-xs text-gray-400 bg-gray-900/10 p-4 rounded-xl">
            <Award className="h-5 w-5 text-emerald-400 shrink-0" />
            <p className="leading-relaxed">
              This account has access to system logs, automated invoicing alerts, email setups, and supplier registries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
