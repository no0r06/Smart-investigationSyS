/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { cases as caseList, type CaseSummary } from '../data'
import { assetImages } from '../utils/imageAssets'

type GraphNode = {
  id: string
  name: string
  caseItem: CaseSummary
}

type GraphLink = {
  source: string
  target: string
  score: number
  factors: string[]
}

type HoveredLink = {
  source: string
  target: string
  score: number
  factors: string[]
}

function rangesOverlap(aMin: number, aMax: number, bMin: number, bMax: number) {
  return aMin <= bMax && bMin <= aMax
}

function computeScore(a: CaseSummary, b: CaseSummary) {
  const factors: string[] = []

  if (a.locationType === b.locationType) {
    factors.push('location')
  }

  if (a.method === b.method) {
    factors.push('method')
  }

  if (a.victimGender === b.victimGender) {
    factors.push('gender')
  }

  if (rangesOverlap(a.victimAgeMin, a.victimAgeMax, b.victimAgeMin, b.victimAgeMax)) {
    factors.push('age')
  }

  return {
    score: factors.length,
    factors,
  }
}

function getNodeColor(score: number) {
  if (score >= 4) return '#ef4444'
  if (score >= 3) return '#f97316'
  if (score >= 2) return '#fbbf24'
  return '#94a3b8'
}

export default function LinkAnalysisPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [hoveredLink, setHoveredLink] = useState<HoveredLink | null>(null)
  const [genderFilter, setGenderFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')
  const [ageFilter, setAgeFilter] = useState('All')
  const [graphError] = useState(false)

  const genders = useMemo(() => ['All', ...Array.from(new Set(caseList.map(c => c.victimGender)))], [])
  const locations = useMemo(() => ['All', ...Array.from(new Set(caseList.map(c => c.locationType)))], [])
  const methods = useMemo(() => ['All', ...Array.from(new Set(caseList.map(c => c.method)))], [])
  const ageRanges = useMemo(() => ['All', ...Array.from(new Set(caseList.map(c => c.victimAgeRange)))], [])

  const filteredCases = useMemo(() => {
    return caseList.filter(c => {
      if (genderFilter !== 'All' && c.victimGender !== genderFilter) return false
      if (locationFilter !== 'All' && c.locationType !== locationFilter) return false
      if (methodFilter !== 'All' && c.method !== methodFilter) return false
      if (ageFilter !== 'All' && c.victimAgeRange !== ageFilter) return false
      return true
    })
  }, [genderFilter, locationFilter, methodFilter, ageFilter])

  const { nodes, links } = useMemo(() => {
    const graphNodes: GraphNode[] = filteredCases.map(c => ({
      id: c.id,
      name: c.title,
      caseItem: c,
    }))

    const graphLinks: GraphLink[] = []

    for (let i = 0; i < filteredCases.length; i += 1) {
      for (let j = i + 1; j < filteredCases.length; j += 1) {
        const { score, factors } = computeScore(filteredCases[i], filteredCases[j])

        if (score >= 2) {
          graphLinks.push({
            source: filteredCases[i].id,
            target: filteredCases[j].id,
            score,
            factors,
          })
        }
      }
    }

    return { nodes: graphNodes, links: graphLinks }
  }, [filteredCases])

  const nodeScores = useMemo(() => {
    const scores = new Map<string, number>()

    nodes.forEach(node => scores.set(node.id, 0))
    links.forEach(link => {
      scores.set(link.source, Math.max(scores.get(link.source) ?? 0, link.score))
      scores.set(link.target, Math.max(scores.get(link.target) ?? 0, link.score))
    })

    return scores
  }, [links, nodes])

  const selectedLinkScores = useMemo(() => {
    if (!selectedNode) {
      return []
    }

    return links
      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
      .map(link => {
        const otherId = link.source === selectedNode.id ? link.target : link.source
        const otherCase = nodes.find(node => node.id === otherId)

        return {
          id: otherId,
          title: otherCase?.name ?? otherId,
          score: link.score,
          factors: link.factors,
        }
      })
  }, [links, nodes, selectedNode])

  const resetFilters = () => {
    setGenderFilter('All')
    setLocationFilter('All')
    setMethodFilter('All')
    setAgeFilter('All')
  }

  if (graphError) {
    return (
      <div className="rounded-[2rem] border border-red-900/60 bg-slate-950/85 p-8 text-slate-100 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
        <h1 className="text-2xl font-semibold text-white">Graph visualization unavailable</h1>
        <p className="mt-3 text-sm text-slate-300">
          The force graph failed to initialize. You are still able to browse the rest of the platform.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Showing {nodes.length} cases with {links.length} links.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-red-900/30 bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <img
          src={assetImages.analysisBg}
          alt="Link analysis background"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = assetImages.spotlight
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/90" />
        <div className="relative flex flex-wrap items-center gap-3">
          <select
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
          >
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
          >
            {methods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>

          <select
            value={ageFilter}
            onChange={e => setAgeFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
          >
            {ageRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-red-700/60 hover:text-white"
          >
            Reset
          </button>

          <div className="ml-auto text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{filteredCases.length}</span> cases and <span className="font-semibold text-white">{links.length}</span> links
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-[2rem] border border-red-900/30 bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between px-2 pb-3">
            <div>
              <h1 className="text-2xl font-semibold text-white">Link Analysis</h1>
              <p className="text-sm text-slate-400">Interactive victim-profile case linking graph</p>
            </div>
            <div className="text-sm text-slate-300">Links shown: score ≥ 2</div>
          </div>

          {filteredCases.length === 0 ? (
            <div className="flex h-[68vh] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-700 bg-slate-950/50 text-slate-300">
              No cases match the active filters.
            </div>
          ) : (
            <div className="h-[68vh] rounded-[1.5rem] border border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.12),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.45),rgba(15,23,42,0.9))]">
              <ForceGraph2D
                graphData={{ nodes, links }}
                width={800}
                height={620}
                backgroundColor="rgba(15,23,42,0)"
                nodeLabel={(node: any) => `${node.id} - ${node.name}`}
                nodeAutoColorBy={undefined}
                nodeCanvasObject={(node: any, ctx: any) => {
                  const score = nodeScores.get(node.id) ?? 0
                  const radius = 6 + score * 1.4

                  ctx.beginPath()
                  ctx.fillStyle = getNodeColor(score)
                  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
                  ctx.fill()

                  ctx.beginPath()
                  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
                  ctx.lineWidth = 1
                  ctx.arc(node.x, node.y, radius + 1.5, 0, 2 * Math.PI, false)
                  ctx.stroke()
                }}
                linkColor={(link: any) => {
                  if (link.score >= 4) return '#ef4444'
                  if (link.score >= 3) return '#f97316'
                  return '#fbbf24'
                }}
                linkWidth={(link: any) => Math.max(1.2, link.score * 1.2)}
                linkDirectionalParticles={0}
                onNodeClick={(node: any) => setSelectedNode(node as GraphNode)}
                onLinkHover={(link: any) => {
                  if (!link) {
                    setHoveredLink(null)
                    return
                  }

                  setHoveredLink({
                    source: link.source.id ?? link.source,
                    target: link.target.id ?? link.target,
                    score: link.score,
                    factors: link.factors,
                  })
                }}
                onNodeHover={() => setHoveredLink(null)}
              />
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 px-2 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#ef4444]" />
              <span>Score 4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#f97316]" />
              <span>Score 3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#fbbf24]" />
              <span>Score 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-[#94a3b8]" />
              <span>Isolated / no qualifying links</span>
            </div>
          </div>

          <div className="mt-3 rounded-[1.2rem] border border-slate-800/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            {hoveredLink ? (
              <div>
                <span className="font-semibold text-white">Hover details:</span>{' '}
                Score {hoveredLink.score} • Factors: {hoveredLink.factors.join(', ')}
              </div>
            ) : (
              <div>Hover an edge to reveal the matching factors for the relationship.</div>
            )}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-red-900/30 bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-300">Selected case</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{selectedNode.caseItem.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedNode.caseItem.id}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p>
                  <p className="mt-2 text-sm text-white">{selectedNode.caseItem.locationType}</p>
                </div>
                <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Method</p>
                  <p className="mt-2 text-sm text-white">{selectedNode.caseItem.method}</p>
                </div>
                <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Victim gender</p>
                  <p className="mt-2 text-sm text-white">{selectedNode.caseItem.victimGender}</p>
                </div>
                <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Age range</p>
                  <p className="mt-2 text-sm text-white">{selectedNode.caseItem.victimAgeRange}</p>
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Summary</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{selectedNode.caseItem.summary}</p>
              </div>

              <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Link scores</p>
                  <span className="text-xs text-slate-400">{selectedLinkScores.length} connections</span>
                </div>

                <div className="mt-3 space-y-2">
                  {selectedLinkScores.length === 0 ? (
                    <p className="text-sm text-slate-400">No qualifying links for the current filter set.</p>
                  ) : (
                    selectedLinkScores.map(link => (
                      <div
                        key={link.id}
                        className="rounded-[1rem] border border-slate-800/80 bg-slate-950/70 px-3 py-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{link.title}</p>
                            <p className="text-xs text-slate-400">{link.id}</p>
                          </div>
                          <div className="text-sm font-semibold text-red-200">{link.score}</div>
                        </div>
                        <p className="mt-2 text-xs text-slate-300">{link.factors.join(', ')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-300">Case details</p>
                <h2 className="mt-3 text-xl font-semibold text-white">Select a node</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Click any node in the graph to inspect its victim profile, investigation method, and matching case links.
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-slate-800/80 bg-slate-900/70 p-3 text-sm text-slate-300">
                <p className="font-semibold text-white">Current filters</p>
                <p className="mt-2">Gender: {genderFilter}</p>
                <p>Location: {locationFilter}</p>
                <p>Method: {methodFilter}</p>
                <p>Age: {ageFilter}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}