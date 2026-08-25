"use client";
import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: string;
  badge?: string;
  badgeColor?: string;
}

interface CustomSelectProps<T extends string = string> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
}

export function CustomSelect<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  className = "",
  id,
  size = "md",
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: "py-1.5 px-3 text-xs min-h-[34px]",
    md: "py-2.5 px-3.5 text-sm min-h-[42px]",
    lg: "py-3 px-4 text-base min-h-[48px]",
  };

  return (
    <div className={`relative flex flex-col gap-1.5 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2.5 rounded-xl border bg-white text-left transition-all duration-200 select-none ${
          sizeClasses[size]
        } ${
          disabled
            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            : isOpen
            ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/15 shadow-sm text-slate-900"
            : "border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedOption?.icon && (
            <i className={`fas ${selectedOption.icon} text-slate-400 text-xs`} />
          )}
          <span className={`truncate ${selectedOption ? "font-medium text-slate-800" : "text-slate-400"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span
              className={`text-[0.68rem] px-2 py-0.5 rounded-full font-semibold ${
                selectedOption.badgeColor || "bg-slate-100 text-slate-700"
              }`}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>

        <i
          className={`fas fa-chevron-down text-slate-400 text-xs transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[var(--primary)]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-1.5 w-full min-w-[200px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl z-[999] animate-in fade-in slide-in-from-top-2 duration-150 scrollbar-thin"
          style={{
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 8px 15px -6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`group flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all duration-150 select-none ${
                  isSelected
                    ? "bg-[rgba(197,138,35,0.1)] text-[var(--primary-strong)] font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {option.icon && (
                    <i
                      className={`fas ${option.icon} text-xs transition-colors ${
                        isSelected ? "text-[var(--primary)]" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                  )}
                  <span className="truncate">{option.label}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {option.badge && (
                    <span
                      className={`text-[0.65rem] px-2 py-0.5 rounded-full font-semibold ${
                        option.badgeColor || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {option.badge}
                    </span>
                  )}
                  {isSelected && (
                    <i className="fas fa-check text-[var(--primary)] text-xs" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
