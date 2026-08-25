"use client";
import React from "react";
import { Topbar } from "../../components/Topbar";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" breadcrumb="Settings" />
      <main className="admin-content">
        <div className="admin-card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fas fa-gear"></i>
            </div>
            <div className="empty-state-title">Settings</div>
            <div className="empty-state-desc">
              Admin account settings, password change, and configuration will be available here.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
