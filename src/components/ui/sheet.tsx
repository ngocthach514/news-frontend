"use client";
import * as React from 'react';

type SheetProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
};

export function Sheet({ open, onOpenChange, side = 'left', children }: SheetProps) {
  return (
    <div>
      {open && <div className="sheet-backdrop" onClick={() => onOpenChange(false)} />}
      <div className={`sheet-panel sheet-${side} ${open ? 'open' : ''}`}>{children}</div>
      <style jsx>{`
        .sheet-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 1000;
        }
        .sheet-panel {
          position: fixed; z-index: 1001; background: #fff; min-width: 280px; max-width: 90vw; height: 100vh;
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          transition: transform .25s ease;
        }
        .sheet-left { top: 0; left: 0; transform: translateX(-100%); }
        .sheet-right { top: 0; right: 0; transform: translateX(100%); }
        .sheet-top { top: 0; left: 0; right:0; height: auto; transform: translateY(-100%); }
        .sheet-bottom { bottom: 0; left: 0; right:0; height: auto; transform: translateY(100%); }
        .open.sheet-left, .open.sheet-top, .open.sheet-right, .open.sheet-bottom { transform: translate(0,0); }
      `}</style>
    </div>
  );
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 16, borderBottom: '1px solid #eee', fontWeight: 600 }}>{children}</div>;
}

export function SheetContent({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 16 }}>{children}</div>;
}
