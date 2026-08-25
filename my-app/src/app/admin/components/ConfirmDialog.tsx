"use client";
import React from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning";
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const iconMap = {
    danger: { icon: "fa-triangle-exclamation", bg: "var(--danger-soft)", color: "var(--danger)" },
    warning: { icon: "fa-circle-exclamation", bg: "var(--warning-soft)", color: "var(--warning)" },
  };

  const { icon, bg, color } = iconMap[variant];

  return (
    <div className="modal-center-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-center" role="alertdialog" aria-modal="true">
        <div className="modal-center-icon" style={{ background: bg, color }}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h2 className="modal-center-title">{title}</h2>
        <p className="modal-center-desc">{description}</p>
        <div className="modal-center-actions">
          <button className="btn btn-ghost" onClick={onCancel} id="confirm-dialog-cancel">
            Cancel
          </button>
          <button
            className={variant === "danger" ? "btn btn-danger" : "btn btn-primary"}
            onClick={onConfirm}
            id="confirm-dialog-confirm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
