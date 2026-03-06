import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  type: string;
  status: "available" | "sold" | "pending";
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  salesCount: number;
  revenue: number;
  rating: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget: number;
  leads: number;
  status: "active" | "paused" | "completed";
}

export interface WorkspaceData {
  properties: Property[];
  agents: Agent[];
  transactions: Transaction[];
  leads: Lead[];
  campaigns: Campaign[];
  userRole: string;
}

interface WorkspaceContextType {
  data: WorkspaceData;
  addProperty: (p: Omit<Property, "id">) => void;
  addAgent: (a: Omit<Agent, "id">) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  addLead: (l: Omit<Lead, "id">) => void;
  addCampaign: (c: Omit<Campaign, "id">) => void;
  setUserRole: (role: string) => void;
  deleteProperty: (id: string) => void;
  deleteAgent: (id: string) => void;
  deleteTransaction: (id: string) => void;
  deleteLead: (id: string) => void;
  deleteCampaign: (id: string) => void;
}

const defaultData: WorkspaceData = {
  properties: [],
  agents: [],
  transactions: [],
  leads: [],
  campaigns: [],
  userRole: "Admin",
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const STORAGE_KEY = "realestate-crm-workspace";

const loadData = (): WorkspaceData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultData, ...JSON.parse(stored) };
  } catch {}
  return defaultData;
};

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WorkspaceData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const genId = () => crypto.randomUUID();

  const addProperty = (p: Omit<Property, "id">) =>
    setData((d) => ({ ...d, properties: [...d.properties, { ...p, id: genId() }] }));
  const addAgent = (a: Omit<Agent, "id">) =>
    setData((d) => ({ ...d, agents: [...d.agents, { ...a, id: genId() }] }));
  const addTransaction = (t: Omit<Transaction, "id">) =>
    setData((d) => ({ ...d, transactions: [...d.transactions, { ...t, id: genId() }] }));
  const addLead = (l: Omit<Lead, "id">) =>
    setData((d) => ({ ...d, leads: [...d.leads, { ...l, id: genId() }] }));
  const addCampaign = (c: Omit<Campaign, "id">) =>
    setData((d) => ({ ...d, campaigns: [...d.campaigns, { ...c, id: genId() }] }));
  const setUserRole = (role: string) => setData((d) => ({ ...d, userRole: role }));

  const deleteProperty = (id: string) =>
    setData((d) => ({ ...d, properties: d.properties.filter((x) => x.id !== id) }));
  const deleteAgent = (id: string) =>
    setData((d) => ({ ...d, agents: d.agents.filter((x) => x.id !== id) }));
  const deleteTransaction = (id: string) =>
    setData((d) => ({ ...d, transactions: d.transactions.filter((x) => x.id !== id) }));
  const deleteLead = (id: string) =>
    setData((d) => ({ ...d, leads: d.leads.filter((x) => x.id !== id) }));
  const deleteCampaign = (id: string) =>
    setData((d) => ({ ...d, campaigns: d.campaigns.filter((x) => x.id !== id) }));

  return (
    <WorkspaceContext.Provider
      value={{
        data, addProperty, addAgent, addTransaction, addLead, addCampaign,
        setUserRole, deleteProperty, deleteAgent, deleteTransaction, deleteLead, deleteCampaign,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
};
