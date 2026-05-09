"use client";

import { useEffect, useMemo, useState } from "react";
import { ClinicalSidebar } from "@/components/ClinicalSidebar";
import { Control } from "@/components/Control";
import { PresetButton } from "@/components/PresetButton";
import { SelectableCard } from "@/components/SelectableCard";
import { Summary } from "@/components/Summary";
import { clinicalSupport } from "@/data/clinicalSupport";
import { allSessionFocus, allVisitStages, CUSTOM_LIBRARY_KEY, EXPORT_VERSION, PRESET_KEY } from "@/data/constants";
import { data } from "@/data/interventionLibrary";
import { clinicPresets } from "@/data/presets";
import { buildHepMessage } from "@/lib/hepMessage";
import { generateComment as buildComment } from "@/lib/commentGenerator";
import { makeSelectableItems, recommendSession } from "@/lib/recommendationEngine";
import type { CptCode, LibraryType, SessionFocus, VisitStage } from "@/types/clinical";
import type { CustomItem, Preset } from "@/types/preset";
import { loadJson, saveJson } from "@/utils/storage";

export default function Home() {
  const [region, setRegion] = useState("Cervical");
  const [pattern, setPattern] = useState("Motor Control Deficit");
  const [goal, setGoal] = useState("Desk tolerance");
  const [irritability, setIrritability] = useState("Moderate");
  const [visitStage, setVisitStage] = useState<VisitStage>("Mid Phase");
  const [sessionFocus, setSessionFocus] = useState<SessionFocus>("Motor Control");
  const [noteLength, setNoteLength] = useState("Standard");
  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([]);
  const [selectedCueing, setSelectedCueing] = useState<string[]>([]);
  const [selectedCompensation, setSelectedCompensation] = useState<string[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string[]>([]);
  const [selectedHep, setSelectedHep] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [myPresets, setMyPresets] = useState<Preset[]>([]);
  const [customType, setCustomType] = useState<LibraryType>("intervention");
  const [customCpt, setCustomCpt] = useState<CptCode>("97110");
  const [customText, setCustomText] = useState("");
  const [customTags, setCustomTags] = useState("");
  const [search, setSearch] = useState("");
  const [presetName, setPresetName] = useState("");
  const [importText, setImportText] = useState("");

  const current = data[region][pattern];
  const patterns = Object.keys(data[region]);
  const support = clinicalSupport[region] ?? clinicalSupport.Cervical;

  useEffect(() => {
    setCustomItems(loadJson<CustomItem[]>(CUSTOM_LIBRARY_KEY, []));
    setMyPresets(loadJson<Preset[]>(PRESET_KEY, []));
  }, []);

  useEffect(() => { saveJson(CUSTOM_LIBRARY_KEY, customItems); }, [customItems]);
  useEffect(() => { saveJson(PRESET_KEY, myPresets); }, [myPresets]);

  function resetSelections() {
    setSelectedInterventions([]);
    setSelectedCueing([]);
    setSelectedCompensation([]);
    setSelectedResponse([]);
    setSelectedHep([]);
    setComment("");
  }

  function resetRegion(newRegion: string) {
    const firstPattern = Object.keys(data[newRegion])[0];
    setRegion(newRegion);
    setPattern(firstPattern);
    setGoal(data[newRegion][firstPattern].goals[0]);
    resetSelections();
  }

  function resetPattern(newPattern: string) {
    setPattern(newPattern);
    setGoal(data[region][newPattern].goals[0]);
    resetSelections();
  }

  function toggle(value: string, selected: string[], setter: (v: string[]) => void) {
    setter(selected.includes(value) ? selected.filter((x) => x !== value) : [...selected, value]);
  }

  function autoRecommend() {
    const rec = recommendSession(current, irritability, visitStage, sessionFocus, search);
    setSelectedInterventions(rec.interventions);
    setSelectedCueing(rec.cueing);
    setSelectedCompensation(rec.compensation);
    setSelectedResponse(rec.response);
    setSelectedHep(support.hep.slice(0, 3));
    setComment("");
  }

  function addCustomItem() {
    const text = customText.trim();
    if (!text) return alert("Enter your custom wording.");
    const item: CustomItem = {
      id: `custom-${Date.now()}`,
      type: customType,
      region,
      pattern,
      cpt: customType === "intervention" ? customCpt : undefined,
      text,
      tags: customTags.split(",").map((x) => x.trim()).filter(Boolean),
    };
    setCustomItems((prev) => [...prev, item]);
    setCustomText("");
    setCustomTags("");
  }

  function deleteCustomItem(id: string, text: string) {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedInterventions((prev) => prev.filter((x) => x !== text));
    setSelectedCueing((prev) => prev.filter((x) => x !== text));
    setSelectedCompensation((prev) => prev.filter((x) => x !== text));
    setSelectedResponse((prev) => prev.filter((x) => x !== text));
  }

  function getCustom(type: LibraryType, cpt?: CptCode) {
    return customItems.filter((item) => {
      if (item.region !== region || item.pattern !== pattern || item.type !== type) return false;
      if (type === "intervention") return item.cpt === cpt;
      return true;
    });
  }

  function loadPreset(preset: Preset) {
    setRegion(preset.region);
    setPattern(preset.pattern);
    setGoal(preset.goal);
    setIrritability(preset.irritability);
    setVisitStage(preset.visitStage);
    setSessionFocus(preset.sessionFocus);
    setNoteLength(preset.noteLength);
    setSelectedInterventions(preset.selectedInterventions);
    setSelectedCueing(preset.selectedCueing);
    setSelectedCompensation(preset.selectedCompensation);
    setSelectedResponse(preset.selectedResponse);
    setSelectedHep(preset.selectedHep ?? []);
    setComment("");
  }

  function saveCurrentPreset() {
    const cleanName = presetName.trim();
    if (!cleanName) return alert("Enter a preset name.");
    const newPreset: Preset = {
      id: `preset-${Date.now()}`,
      name: cleanName,
      region,
      pattern,
      goal,
      irritability,
      visitStage,
      sessionFocus,
      selectedInterventions,
      selectedCueing,
      selectedCompensation,
      selectedResponse,
      selectedHep,
      noteLength,
      favorite: false,
      source: "My Preset",
      clinicApproved: false,
      category: "Personal",
    };
    setMyPresets((prev) => [...prev, newPreset]);
    setPresetName("");
  }

  function deletePreset(id: string) {
    setMyPresets((prev) => prev.filter((preset) => preset.id !== id));
  }

  function toggleFavorite(id: string) {
    setMyPresets((prev) => prev.map((preset) => (preset.id === id ? { ...preset, favorite: !preset.favorite } : preset)));
  }

  async function exportMyPresets() {
    const payload = { version: EXPORT_VERSION, exportedAt: new Date().toISOString(), presets: myPresets };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert("My Presets JSON copied to clipboard.");
  }

  function importPresets() {
    try {
      const parsed = JSON.parse(importText);
      const incoming = Array.isArray(parsed) ? parsed : parsed.presets;
      if (!Array.isArray(incoming)) return alert("Import failed. Paste exported preset JSON.");
      const cleaned: Preset[] = incoming.map((preset: Preset) => ({
        ...preset,
        id: `imported-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        source: "My Preset",
        clinicApproved: false,
        category: "Imported",
      }));
      setMyPresets((prev) => [...prev, ...cleaned]);
      setImportText("");
      alert("Presets imported.");
    } catch {
      alert("Invalid JSON.");
    }
  }

  const allPresets = [...clinicPresets, ...myPresets];
  const visiblePresets = allPresets.filter(
    (preset) => preset.region === region && preset.pattern === pattern && (!search.trim() || preset.name.toLowerCase().includes(search.toLowerCase()))
  );

  const autoComment = useMemo(
    () =>
      buildComment({
        noteLength,
        pattern,
        goal,
        selectedInterventions,
        selectedCueing,
        selectedCompensation,
        selectedResponse,
        selectedHep,
        fallbackHep: support.hep,
      }),
    [noteLength, pattern, goal, selectedInterventions, selectedCueing, selectedCompensation, selectedResponse, selectedHep, support.hep]
  );

  function generateComment() {
    setComment(autoComment);
  }

  async function copyComment() {
    await navigator.clipboard.writeText(comment || autoComment);
    alert("Comment copied.");
  }

  async function copyHep() {
    await navigator.clipboard.writeText(buildHepMessage(selectedHep, support.hep));
    alert("HEP copied.");
  }

  function sendHepEmail() {
    const email = window.prompt("Patient email address");
    if (!email) return;
    const subject = encodeURIComponent("Home Exercise Program");
    const body = encodeURIComponent(buildHepMessage(selectedHep, support.hep));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-800">PT Clinical Operating System</h1>
          <p className="mt-2 text-slate-600">Clinical intelligence + smart recommendation + preset workflow + HEP support + audit-safe comment builder</p>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <aside className="space-y-4 rounded-3xl bg-white p-6 shadow xl:col-span-1">
            <h2 className="text-xl font-bold text-slate-800">Clinical Logic Filter</h2>
            <Control label="Region">
              <select className="w-full rounded-xl border p-3" value={region} onChange={(e) => resetRegion(e.target.value)}>
                {Object.keys(data).map((r) => <option key={r}>{r}</option>)}
              </select>
            </Control>
            <Control label="Clinical Pattern">
              <select className="w-full rounded-xl border p-3" value={pattern} onChange={(e) => resetPattern(e.target.value)}>
                {patterns.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Control>
            <Control label="Functional Goal">
              <select className="w-full rounded-xl border p-3" value={goal} onChange={(e) => setGoal(e.target.value)}>
                {current.goals.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Control>
            <Control label="Irritability">
              <select className="w-full rounded-xl border p-3" value={irritability} onChange={(e) => setIrritability(e.target.value)}>
                <option>High</option>
                <option>Moderate</option>
                <option>Low</option>
              </select>
            </Control>
            <Control label="Visit Stage">
              <select className="w-full rounded-xl border p-3" value={visitStage} onChange={(e) => setVisitStage(e.target.value as VisitStage)}>
                {allVisitStages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </Control>
            <Control label="Session Focus">
              <select className="w-full rounded-xl border p-3" value={sessionFocus} onChange={(e) => setSessionFocus(e.target.value as SessionFocus)}>
                {allSessionFocus.map((focus) => <option key={focus}>{focus}</option>)}
              </select>
            </Control>
            <Control label="Comment Length">
              <select className="w-full rounded-xl border p-3" value={noteLength} onChange={(e) => setNoteLength(e.target.value)}>
                <option>Short</option>
                <option>Standard</option>
                <option>Detailed</option>
              </select>
            </Control>

            <input className="w-full rounded-xl border p-3" placeholder="Search presets/lists..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={autoRecommend} className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">Auto Recommend</button>
            <button onClick={resetSelections} className="w-full rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold">Clear Current Selections</button>
            <Summary title="Selected Interventions" items={selectedInterventions} />
            <Summary title="Selected HEP" items={selectedHep.length > 0 ? selectedHep : support.hep.slice(0, 3)} />
          </aside>

          <section className="space-y-6 xl:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Quick Presets</h2>
                <div className="flex flex-wrap gap-2">
                  <input value={presetName} onChange={(e) => setPresetName(e.target.value)} placeholder="Preset name" className="rounded-xl border p-2 text-sm" />
                  <button onClick={saveCurrentPreset} className="rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white">Save Current as Preset</button>
                  <button onClick={exportMyPresets} className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white">Export</button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {visiblePresets.map((preset) => (
                  <PresetButton key={preset.id} preset={preset} onLoad={loadPreset} onDelete={deletePreset} onFavorite={toggleFavorite} />
                ))}
              </div>
              <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
                <p className="mb-2 text-sm font-bold text-slate-700">Import Presets JSON</p>
                <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste exported preset JSON here" className="min-h-[80px] w-full rounded-xl border p-3 text-xs" />
                <button onClick={importPresets} className="mt-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">Import</button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">My Custom Library</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
                <select value={customType} onChange={(e) => setCustomType(e.target.value as LibraryType)} className="rounded-xl border p-3">
                  <option value="intervention">Intervention</option>
                  <option value="cueing">Cueing</option>
                  <option value="compensation">Compensation</option>
                  <option value="response">Response</option>
                </select>
                <select value={customCpt} onChange={(e) => setCustomCpt(e.target.value as CptCode)} className="rounded-xl border p-3" disabled={customType !== "intervention"}>
                  <option value="97140">97140</option>
                  <option value="97530">97530</option>
                  <option value="97110">97110</option>
                </select>
                <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Add personal wording" className="rounded-xl border p-3 md:col-span-2" />
                <input value={customTags} onChange={(e) => setCustomTags(e.target.value)} placeholder="Tags, comma separated" className="rounded-xl border p-3" />
                <button onClick={addCustomItem} className="rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white">Add</button>
              </div>
              <p className="mt-3 text-sm text-slate-600">Saved only in this browser. No patient information is stored.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(["97140", "97530", "97110"] as CptCode[]).map((code) => (
                <SelectableCard
                  key={code}
                  title={code}
                  items={makeSelectableItems(current.interventions[code], getCustom("intervention", code), irritability, visitStage, sessionFocus, search)}
                  selected={selectedInterventions}
                  onToggle={(text) => toggle(text, selectedInterventions, setSelectedInterventions)}
                  onDelete={deleteCustomItem}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SelectableCard title="Cueing" items={makeSelectableItems(current.cueing, getCustom("cueing"), irritability, visitStage, sessionFocus, search)} selected={selectedCueing} onToggle={(text) => toggle(text, selectedCueing, setSelectedCueing)} onDelete={deleteCustomItem} />
              <SelectableCard title="Compensation" items={makeSelectableItems(current.compensation, getCustom("compensation"), irritability, visitStage, sessionFocus, search)} selected={selectedCompensation} onToggle={(text) => toggle(text, selectedCompensation, setSelectedCompensation)} onDelete={deleteCustomItem} />
              <SelectableCard title="Response" items={makeSelectableItems(current.response, getCustom("response"), irritability, visitStage, sessionFocus, search)} selected={selectedResponse} onToggle={(text) => toggle(text, selectedResponse, setSelectedResponse)} onDelete={deleteCustomItem} />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">Auto-Generated Audit-Safe Comment</h2>
                <div className="flex gap-2">
                  <button onClick={generateComment} className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Generate</button>
                  <button onClick={copyComment} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white">Copy Comment</button>
                  <button onClick={copyHep} className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white">Copy HEP</button>
                  <button onClick={sendHepEmail} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Email HEP</button>
                </div>
              </div>
              <textarea value={comment || autoComment} onChange={(e) => setComment(e.target.value)} className="min-h-[270px] w-full rounded-2xl border bg-slate-50 p-5 text-sm leading-7" />
            </div>
          </section>

          <ClinicalSidebar support={support} selectedHep={selectedHep} setSelectedHep={setSelectedHep} region={region} pattern={pattern} />
        </section>
      </div>
    </main>
  );
}
