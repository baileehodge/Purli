import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async createWaitlistEntry(insertEntry: InsertWaitlist): Promise<Waitlist> {
    // Check if email already exists
    const exists = Array.from(this.waitlist.values()).find(
      entry => entry.email === insertEntry.email
    );
    if (exists) {
      throw new Error("Email already registered");
    }

    const id = this.currentId++;
    const entry: Waitlist = { ...insertEntry, id };
    this.waitlist.set(id, entry);
    return entry;
  }

  async getWaitlistCount(): Promise<number> {
    return this.waitlist.size;
  }
}

export const storage = new MemStorage();
