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
        <p className="text-sm text-[var(--text-secondary)] font-medium">View your active session details, platform access privileges, and profile settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <div className="zoho-card flex flex-col items-center justify-center text-center md:col-span-1 border border-[var(--border-color)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--accent-primary)]/5 blur-xl pointer-events-none" />
          
          <div className="h-20 w-20 rounded-xl bg-gray-500/5 border-2 border-[var(--accent-primary)]/30 flex items-center justify-center text-3xl font-extrabold text-[var(--accent-primary)] uppercase shadow-lg shadow-[var(--accent-primary)]/5">
            {user?.name ? user.name[0] : <User className="h-10 w-10" />}
          </div>
          
          <h4 className="mt-4 font-bold text-[var(--text-primary)] text-lg leading-tight">{user?.name || 'Administrator'}</h4>
          <span className="mt-1.5 text-[10px] text-[var(--accent-primary)] font-extrabold tracking-widest uppercase bg-[var(--accent-primary)]/10 px-3 py-1 rounded-full border border-[var(--accent-primary)]/20">
            Developer / Admin
          </span>
        </div>

        {/* Profile Details Details */}
        <div className="zoho-card p-6 md:p-8 rounded-2xl shadow-xl md:col-span-2 border border-[var(--border-color)] space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] border-b border-[var(--border-color)]/60 pb-3">Identity Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
            {/* Full Name */}
            <div className="space-y-1.5">
              <span className="text-[var(--text-secondary)] block">Full Name</span>
              <div className="flex items-center gap-2.5 text-[var(--text-primary)] bg-[var(--bg-app)] border border-[var(--border-color)] p-3 rounded-xl">
                <User className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                <span>{user?.name || 'Administrator'}</span>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <span className="text-[var(--text-secondary)] block">Email Address</span>
              <div className="flex items-center gap-2.5 text-[var(--text-primary)] bg-[var(--bg-app)] border border-[var(--border-color)] p-3 rounded-xl">
                <Mail className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                <span className="truncate">{user?.email || 'admin@inventory.com'}</span>
              </div>
            </div>

            {/* Account Role */}
            <div className="space-y-1.5">
              <span className="text-[var(--text-secondary)] block">Security Privileges</span>
              <div className="flex items-center gap-2.5 text-[var(--text-primary)] bg-[var(--bg-app)] border border-[var(--border-color)] p-3 rounded-xl">
                <Shield className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                <span>Super Administrator</span>
              </div>
            </div>

            {/* Account Creation Date */}
            <div className="space-y-1.5">
              <span className="text-[var(--text-secondary)] block">Member Since</span>
              <div className="flex items-center gap-2.5 text-[var(--text-primary)] bg-[var(--bg-app)] border border-[var(--border-color)] p-3 rounded-xl">
                <Calendar className="h-4 w-4 text-[var(--accent-primary)] shrink-0" />
                <span>{user?.createdAt ? formatDate(user.createdAt) : formatDate(new Date())}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex items-center gap-2.5 text-xs text-[var(--text-secondary)] bg-gray-500/5 p-4 rounded-xl">
            <Award className="h-5 w-5 text-[var(--accent-primary)] shrink-0" />
            <p className="leading-relaxed font-semibold">
              This account has access to system logs, automated invoicing alerts, email setups, and supplier registries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
