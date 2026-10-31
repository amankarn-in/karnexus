import React, { useState } from 'react';
import { Database, Server, RefreshCw, Cpu, Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  tag: string;
  description: string;
  highlightedStreams: string[];
}

export const HeroWorkflowVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'sync' | 'security'>('architecture');
  const [selectedNode, setSelectedNode] = useState<string>('odoo-core');

  const nodes: Record<string, NodeDetail> = {
    'odoo-core': {
      id: 'odoo-core',
      name: 'Odoo ERP Core (v15-18)',
      tag: 'Business Engine',
      description: 'Central transactional engine handling Sales, Inventory, Purchase, and Accounting with maintainable inherited custom modules.',
      highlightedStreams: ['python-gateway', 'db'],
    },
    'python-gateway': {
      id: 'python-gateway',
      name: 'Python & FastAPI Gateway',
      tag: 'Microservices & APIs',
      description: 'High-throughput async endpoints, webhook listeners with HMAC validation, and scheduled automation workers.',
      highlightedStreams: ['odoo-core', 'external', 'db'],
    },
    'external': {
      id: 'external',
      name: 'External Connectors',
      tag: 'E-Commerce & Logistics',
      description: 'Bi-directional sync with Shopify, WooCommerce, courier tracking webhooks, and third-party payment gateways.',
      highlightedStreams: ['python-gateway'],
    },
    'db': {
      id: 'db',
      name: 'PostgreSQL & Docker',
      tag: 'Data Persistence',
      description: 'ACID-compliant relational storage, read-replica views for Power BI reporting, and automated offsite snapshots.',
      highlightedStreams: ['odoo-core', 'python-gateway'],
    },
  };

  const currentNode = nodes[selectedNode] || nodes['odoo-core'];

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-sm shadow-slate-200/50 backdrop-blur-xs">
      {/* Visual Header / Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
          <span className="text-xs font-bold tracking-wide uppercase text-slate-700">
            System Architecture Overview
          </span>
        </div>
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`rounded-md px-2.5 py-1 transition ${
              activeTab === 'architecture'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Connected Core
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`rounded-md px-2.5 py-1 transition ${
              activeTab === 'sync'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Sync Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`rounded-md px-2.5 py-1 transition ${
              activeTab === 'security'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Container & DB
          </button>
        </div>
      </div>

      {/* Abstract Diagram Canvas */}
      <div className="relative mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: External Connectors */}
          <button
            type="button"
            onClick={() => setSelectedNode('external')}
            className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
              selectedNode === 'external'
                ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 mb-3">
              <RefreshCw className="h-4.5 w-4.5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600">
              External Systems
            </span>
            <span className="mt-1 text-sm font-bold text-slate-900">
              APIs & Channels
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Shopify &bull; Couriers &bull; Stripe
            </span>
          </button>

          {/* Card 2: Python / FastAPI Gateway */}
          <button
            type="button"
            onClick={() => setSelectedNode('python-gateway')}
            className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
              selectedNode === 'python-gateway'
                ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 mb-3">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
              Python Middleware
            </span>
            <span className="mt-1 text-sm font-bold text-slate-900">
              FastAPI & Workers
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Async Tasks &bull; Webhooks &bull; Celery
            </span>
          </button>

          {/* Card 3: Odoo ERP Core */}
          <button
            type="button"
            onClick={() => setSelectedNode('odoo-core')}
            className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
              selectedNode === 'odoo-core'
                ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700 mb-3">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600">
              Enterprise Hub
            </span>
            <span className="mt-1 text-sm font-bold text-slate-900">
              Odoo ERP (v15-18)
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Sales &bull; Stock &bull; Custom Modules
            </span>
          </button>

          {/* Card 4: Data Layer */}
          <button
            type="button"
            onClick={() => setSelectedNode('db')}
            className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
              selectedNode === 'db'
                ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-3">
              <Database className="h-4.5 w-4.5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Persistence Layer
            </span>
            <span className="mt-1 text-sm font-bold text-slate-900">
              PostgreSQL & Docker
            </span>
            <span className="mt-1 text-xs text-slate-500">
              ACID &bull; Backups &bull; Power BI Views
            </span>
          </button>
        </div>

        {/* Selected Component Technical Detail Box */}
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">{currentNode.name}</h4>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {currentNode.tag}
              </span>
            </div>
            <span className="text-xs text-slate-400">Click any component to inspect flow</span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            {currentNode.description}
          </p>
        </div>

        {/* Architectural Principles Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-200/60 px-2.5 py-1 font-medium text-slate-700">
            <ShieldCheck className="h-3 w-3 text-emerald-600" /> No Core Hacks
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-200/60 px-2.5 py-1 font-medium text-slate-700">
            <Zap className="h-3 w-3 text-indigo-600" /> Asynchronous FastAPI
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-200/60 px-2.5 py-1 font-medium text-slate-700">
            <Server className="h-3 w-3 text-teal-600" /> Docker Staging & Prod
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-200/60 px-2.5 py-1 font-medium text-slate-700">
            <Database className="h-3 w-3 text-blue-600" /> Schema-Safe Migrations
          </span>
        </div>
      </div>
    </div>
  );
};
