import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyReserve from "@/components/StickyReserve";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import ReservePage from "./pages/ReservePage";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <StickyReserve />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
