import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Workspace = () => {
  const {
    data, addProperty, addAgent, addTransaction, addLead, addCampaign,
    deleteProperty, deleteAgent, deleteTransaction, deleteLead, deleteCampaign,
  } = useWorkspace();

  // Property form
  const [propForm, setPropForm] = useState({ name: "", location: "", price: "", type: "Residential", status: "available" as const });
  // Agent form
  const [agentForm, setAgentForm] = useState({ name: "", email: "", phone: "", salesCount: "", revenue: "", rating: "" });
  // Transaction form
  const [txForm, setTxForm] = useState({ description: "", amount: "", type: "income" as const, date: "", category: "" });
  // Lead form
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", status: "new" as const, source: "" });
  // Campaign form
  const [campForm, setCampForm] = useState({ name: "", platform: "", budget: "", leads: "", status: "active" as const });

  const handleAddProperty = () => {
    if (!propForm.name || !propForm.price) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    addProperty({ ...propForm, price: Number(propForm.price), status: propForm.status as any });
    setPropForm({ name: "", location: "", price: "", type: "Residential", status: "available" });
    toast({ title: "Property added!" });
  };

  const handleAddAgent = () => {
    if (!agentForm.name) { toast({ title: "Fill agent name", variant: "destructive" }); return; }
    addAgent({ ...agentForm, salesCount: Number(agentForm.salesCount) || 0, revenue: Number(agentForm.revenue) || 0, rating: Number(agentForm.rating) || 0 });
    setAgentForm({ name: "", email: "", phone: "", salesCount: "", revenue: "", rating: "" });
    toast({ title: "Agent added!" });
  };

  const handleAddTransaction = () => {
    if (!txForm.description || !txForm.amount) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    addTransaction({ ...txForm, amount: Number(txForm.amount), type: txForm.type as any });
    setTxForm({ description: "", amount: "", type: "income", date: "", category: "" });
    toast({ title: "Transaction added!" });
  };

  const handleAddLead = () => {
    if (!leadForm.name) { toast({ title: "Fill lead name", variant: "destructive" }); return; }
    addLead({ ...leadForm, status: leadForm.status as any });
    setLeadForm({ name: "", email: "", phone: "", status: "new", source: "" });
    toast({ title: "Lead added!" });
  };

  const handleAddCampaign = () => {
    if (!campForm.name) { toast({ title: "Fill campaign name", variant: "destructive" }); return; }
    addCampaign({ ...campForm, budget: Number(campForm.budget) || 0, leads: Number(campForm.leads) || 0, status: campForm.status as any });
    setCampForm({ name: "", platform: "", budget: "", leads: "", status: "active" });
    toast({ title: "Campaign added!" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 pb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Workspace</h1>
            <p className="text-muted-foreground text-sm mt-1">Add and manage all your CRM data here. Data will appear across all dashboard pages.</p>
          </div>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            {/* PROPERTIES */}
            <TabsContent value="properties">
              <div className="bg-card rounded-xl border border-border p-6 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Property</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Property Name *" value={propForm.name} onChange={(e) => setPropForm({ ...propForm, name: e.target.value })} />
                  <Input placeholder="Location" value={propForm.location} onChange={(e) => setPropForm({ ...propForm, location: e.target.value })} />
                  <Input placeholder="Price *" type="number" value={propForm.price} onChange={(e) => setPropForm({ ...propForm, price: e.target.value })} />
                  <Input placeholder="Type (e.g. Residential)" value={propForm.type} onChange={(e) => setPropForm({ ...propForm, type: e.target.value })} />
                  <Select value={propForm.status} onValueChange={(v) => setPropForm({ ...propForm, status: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddProperty}><Plus className="h-4 w-4 mr-1" /> Add Property</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Properties ({data.properties.length})</h3>
                {data.properties.length === 0 ? <p className="text-muted-foreground text-sm">No properties added yet.</p> : (
                  <div className="space-y-2">
                    {data.properties.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-sm text-muted-foreground">{p.location} · ${p.price.toLocaleString()} · {p.status}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteProperty(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* AGENTS */}
            <TabsContent value="agents">
              <div className="bg-card rounded-xl border border-border p-6 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Agent</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Agent Name *" value={agentForm.name} onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })} />
                  <Input placeholder="Email" value={agentForm.email} onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })} />
                  <Input placeholder="Phone" value={agentForm.phone} onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })} />
                  <Input placeholder="Sales Count" type="number" value={agentForm.salesCount} onChange={(e) => setAgentForm({ ...agentForm, salesCount: e.target.value })} />
                  <Input placeholder="Revenue" type="number" value={agentForm.revenue} onChange={(e) => setAgentForm({ ...agentForm, revenue: e.target.value })} />
                  <Input placeholder="Rating (0-5)" type="number" value={agentForm.rating} onChange={(e) => setAgentForm({ ...agentForm, rating: e.target.value })} />
                </div>
                <Button onClick={handleAddAgent}><Plus className="h-4 w-4 mr-1" /> Add Agent</Button>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Agents ({data.agents.length})</h3>
                {data.agents.length === 0 ? <p className="text-muted-foreground text-sm">No agents added yet.</p> : (
                  <div className="space-y-2">
                    {data.agents.map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="font-medium text-foreground">{a.name}</p>
                          <p className="text-sm text-muted-foreground">{a.email} · {a.salesCount} sales · ${a.revenue.toLocaleString()} · ⭐ {a.rating}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteAgent(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* FINANCIAL */}
            <TabsContent value="financial">
              <div className="bg-card rounded-xl border border-border p-6 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Transaction</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Description *" value={txForm.description} onChange={(e) => setTxForm({ ...txForm, description: e.target.value })} />
                  <Input placeholder="Amount *" type="number" value={txForm.amount} onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })} />
                  <Select value={txForm.type} onValueChange={(v) => setTxForm({ ...txForm, type: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Date" type="date" value={txForm.date} onChange={(e) => setTxForm({ ...txForm, date: e.target.value })} />
                  <Input placeholder="Category" value={txForm.category} onChange={(e) => setTxForm({ ...txForm, category: e.target.value })} />
                  <Button onClick={handleAddTransaction}><Plus className="h-4 w-4 mr-1" /> Add Transaction</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Transactions ({data.transactions.length})</h3>
                {data.transactions.length === 0 ? <p className="text-muted-foreground text-sm">No transactions added yet.</p> : (
                  <div className="space-y-2">
                    {data.transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="font-medium text-foreground">{t.description}</p>
                          <p className="text-sm text-muted-foreground">{t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()} · {t.category} · {t.date}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteTransaction(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* LEADS */}
            <TabsContent value="leads">
              <div className="bg-card rounded-xl border border-border p-6 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Lead</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Lead Name *" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} />
                  <Input placeholder="Email" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} />
                  <Input placeholder="Phone" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} />
                  <Select value={leadForm.status} onValueChange={(v) => setLeadForm({ ...leadForm, status: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Source" value={leadForm.source} onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })} />
                  <Button onClick={handleAddLead}><Plus className="h-4 w-4 mr-1" /> Add Lead</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Leads ({data.leads.length})</h3>
                {data.leads.length === 0 ? <p className="text-muted-foreground text-sm">No leads added yet.</p> : (
                  <div className="space-y-2">
                    {data.leads.map((l) => (
                      <div key={l.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="font-medium text-foreground">{l.name}</p>
                          <p className="text-sm text-muted-foreground">{l.email} · {l.status} · {l.source}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteLead(l.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* MARKETING */}
            <TabsContent value="marketing">
              <div className="bg-card rounded-xl border border-border p-6 mb-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Add Campaign</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Campaign Name *" value={campForm.name} onChange={(e) => setCampForm({ ...campForm, name: e.target.value })} />
                  <Input placeholder="Platform" value={campForm.platform} onChange={(e) => setCampForm({ ...campForm, platform: e.target.value })} />
                  <Input placeholder="Budget" type="number" value={campForm.budget} onChange={(e) => setCampForm({ ...campForm, budget: e.target.value })} />
                  <Input placeholder="Leads Generated" type="number" value={campForm.leads} onChange={(e) => setCampForm({ ...campForm, leads: e.target.value })} />
                  <Select value={campForm.status} onValueChange={(v) => setCampForm({ ...campForm, status: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddCampaign}><Plus className="h-4 w-4 mr-1" /> Add Campaign</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Campaigns ({data.campaigns.length})</h3>
                {data.campaigns.length === 0 ? <p className="text-muted-foreground text-sm">No campaigns added yet.</p> : (
                  <div className="space-y-2">
                    {data.campaigns.map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-sm text-muted-foreground">{c.platform} · ${c.budget.toLocaleString()} · {c.leads} leads · {c.status}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => deleteCampaign(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
