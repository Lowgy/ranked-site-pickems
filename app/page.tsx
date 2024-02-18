import DragDrop from '@/components/drag-drop';
import { SiteHeader } from '@/components/site-header';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <DragDrop />
    </main>
  );
}
