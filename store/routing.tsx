import { create } from "zustand";
import { RoutingType } from "../components/interface/routing";

export const routing = create<RoutingType>((set) => ({
	lastPath: "",
	_setLastPath: (path) => set(() => ({ lastPath: path })),
}));
