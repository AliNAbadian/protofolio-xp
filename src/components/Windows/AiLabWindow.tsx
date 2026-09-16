import React, { useState } from 'react';
import type { AiScenarioType } from '../../types';

export const AiLabWindow: React.FC = () => {
  const [scenario, setScenario] = useState<AiScenarioType>('route');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-container-lowest">
      <div className="flex-1 p-space-md overflow-y-auto flex flex-col gap-space-md">
        {/* High Level Pipeline Diagram */}
        <div className="bg-surface-container-low p-space-md rounded-lg shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-label-md text-primary font-bold">
              The Generative UI &amp; MCP Protocol Pipeline
            </span>
            <span className="font-code-sm text-code-sm text-secondary font-bold">
              Schema: Zod • Transport: SSE/MCP
            </span>
          </div>

          {/* Visual Flow Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-space-xs text-center">
            <div className="p-2 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[20px]">
                prompt_suggestion
              </span>
              <span className="font-label-sm text-label-sm font-bold mt-1 text-on-surface">
                1. User Query
              </span>
              <span className="font-code-sm text-code-sm text-outline text-[9px]">
                Intent &amp; Context
              </span>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                psychology
              </span>
              <span className="font-label-sm text-label-sm font-bold mt-1 text-on-surface">
                2. Model / Tool
              </span>
              <span className="font-code-sm text-code-sm text-outline text-[9px]">
                MCP Function Call
              </span>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-primary-container text-[20px]">
                data_object
              </span>
              <span className="font-label-sm text-label-sm font-bold mt-1 text-on-surface">
                3. Schema Validate
              </span>
              <span className="font-code-sm text-code-sm text-outline text-[9px]">
                Zod Validation
              </span>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                dynamic_form
              </span>
              <span className="font-label-sm text-label-sm font-bold mt-1 text-on-surface">
                4. GenUI Engine
              </span>
              <span className="font-code-sm text-code-sm text-outline text-[9px]">
                Component Match
              </span>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded shadow-sm flex flex-col items-center col-span-2 md:col-span-1">
              <span className="material-symbols-outlined text-error text-[20px]">touch_app</span>
              <span className="font-label-sm text-label-sm font-bold mt-1 text-on-surface">
                5. Interactive UI
              </span>
              <span className="font-code-sm text-code-sm text-outline text-[9px]">
                Live React Node
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Scenario Switcher */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="font-label-md text-label-md text-on-surface font-bold">
            Select Generative Scenario:
          </span>
          <button
            onClick={() => setScenario('route')}
            className={`px-space-sm py-1 rounded font-label-sm text-label-sm shadow-sm cursor-pointer transition-colors ${scenario === 'route'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
          >
            Route Optimizer
          </button>
          <button
            onClick={() => setScenario('metrics')}
            className={`px-space-sm py-1 rounded font-label-sm text-label-sm shadow-sm cursor-pointer transition-colors ${scenario === 'metrics'
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
          >
            Cluster Metrics
          </button>
          <button
            onClick={() => setScenario('schema')}
            className={`px-space-sm py-1 rounded font-label-sm text-label-sm shadow-sm cursor-pointer transition-colors ${scenario === 'schema'
                ? 'bg-tertiary text-on-tertiary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
          >
            MCP Raw Schema
          </button>
        </div>

        {/* Interactive Render Container */}
        <div className="p-space-md bg-surface-container-low rounded-lg shadow-inner flex flex-col gap-space-sm flex-1 min-h-[160px] border border-outline-variant/30">
          {scenario === 'route' && (
            <div className="flex flex-col gap-space-sm animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <span className="font-headline-sm text-headline-sm text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>{' '}
                  Multi-Stop Route Optimizer Component
                </span>
                <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono">
                  Hydrated in 18ms
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Prompt:{' '}
                <span className="italic text-on-surface-variant">
                  "Reorder stop cluster #42 to minimize idle delivery truck wait time and handle refrigeration windows."
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm mt-1">
                <div className="p-space-sm bg-surface-container-lowest rounded shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline">Waypoint Sequence</span>
                  <div className="font-code-md text-code-md text-primary font-bold mt-1 font-mono">
                    #14 → #08 → #22 → #41
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary mt-1 block font-medium">
                    Saved 42 km (18.4%)
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-lowest rounded shadow-sm">
                  <span className="font-label-sm text-label-sm text-outline">Cold Chain Status</span>
                  <div className="font-label-md text-label-md text-secondary font-bold mt-1">
                    Compliant (3.2°C)
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">
                    Within safety margin
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
                  <span className="font-label-sm text-label-sm text-outline">Driver Handshake</span>
                  <button
                    onClick={() =>
                      alert('Action dispatched: Route push notification transmitted.')
                    }
                    className="px-space-sm py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm shadow hover:bg-primary-container cursor-pointer mt-2"
                  >
                    Dispatch to Mobile
                  </button>
                </div>
              </div>
            </div>
          )}

          {scenario === 'metrics' && (
            <div className="flex flex-col gap-space-sm animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <span className="font-headline-sm text-headline-sm text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">query_stats</span>{' '}
                  Real-Time Geospatial Cluster Telemetry
                </span>
                <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono">
                  Streaming 120 msg/sec
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Agent Action:{' '}
                <span className="italic text-on-surface-variant">
                  "Synthesize regional node throughput and trigger automated failover alert."
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-1">
                <div className="p-space-sm bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
                  <span className="font-label-sm text-label-sm text-outline">
                    Cluster Density Heatmap
                  </span>
                  <div className="h-10 bg-surface-container-low rounded mt-1 flex items-center px-2 border border-outline-variant/20">
                    <div className="h-3 w-3/4 rounded bg-gradient-to-r from-secondary to-tertiary animate-pulse"></div>
                  </div>
                  <span className="font-code-sm text-code-sm text-on-surface-variant mt-1 font-mono">
                    Active Polygons: 2,419 / GPU Draw calls: 4
                  </span>
                </div>
                <div className="p-space-sm bg-surface-container-lowest rounded shadow-sm flex flex-col justify-between">
                  <span className="font-label-sm text-label-sm text-outline">Dynamic Agent Advice</span>
                  <span className="font-body-sm text-body-sm text-on-surface mt-1">
                    Shift 15% traffic to Northwest replica to prevent edge bottle-necking.
                  </span>
                  <button
                    onClick={() => alert('Cluster auto-rebalanced across 3 nodes.')}
                    className="mt-2 px-space-sm py-1 bg-secondary text-on-secondary rounded font-label-sm text-label-sm shadow hover:bg-on-secondary-container cursor-pointer"
                  >
                    Execute Rebalance
                  </button>
                </div>
              </div>
            </div>
          )}

          {scenario === 'schema' && (
            <div className="flex flex-col gap-space-sm animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <span className="font-headline-sm text-headline-sm text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">code_blocks</span> MCP
                  Tool Structured Protocol Output
                </span>
                <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-mono font-bold">
                  JSON-Schema v7
                </span>
              </div>
              <pre className="bg-surface-container-lowest p-space-sm rounded font-code-sm text-code-sm text-on-surface overflow-x-auto select-text shadow-inner font-mono leading-relaxed border border-outline-variant/20">
                {`{
  "tool": "optimizeDeliveryFleet",
  "arguments": {
    "clusterId": "IR-TBZ-99",
    "vehicles": 14,
    "constraints": {
      "trafficModel": "realtime",
      "avoidTolls": false
    }
  },
  "uiRenderer": "RouteOptimizationCard.v2"
}`}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-surface-container px-space-md py-1 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant shadow-inner border-t border-outline-variant/30">
        <span>MCP Server: Connected (Localhost:8080)</span>
        <span>Generative UI: 60 FPS Canvas Ready</span>
      </div>
    </div>
  );
};
