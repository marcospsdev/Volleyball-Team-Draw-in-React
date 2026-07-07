import type { ReactNode } from "react";
import { IOSHeader } from "@/components/ui/IOSHeader";
import { BottomTabBar } from "@/components/ui/BottomTabBar";

const APP_TITLE = "Marquinhos & Luquinhas ©";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <IOSHeader title={APP_TITLE} />
      <main className="flex-1 overflow-y-auto p-4 pb-24">{children}</main>
      <BottomTabBar />
      {/* alvo de portal para elementos position:fixed de páginas (ex. FAB) —
          fica dentro da árvore React (evitando o problema de aria-hidden do
          MUI Modal ao portalizar direto em document.body), mas fora de
          qualquer ancestral com transform (evitando o bug de fixed quebrado
          dentro do motion.div da transição de página). */}
      <div id="fixed-portal-root" />
    </div>
  );
}
