// Aura AI Stylist Runtime Configuration
// In local production / development, all requests route to your local backend server.
// To connect to a cloud Supabase project, replace window.__SUPABASE_URL__ and window.__SUPABASE_ANON_KEY__.

const origin = (typeof window !== 'undefined' && window.location && window.location.origin && window.location.protocol.startsWith('http'))
  ? window.location.origin
  : 'http://localhost:3000';

window.__SUPABASE_URL__ = origin;
window.__SUPABASE_ANON_KEY__ = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbm5paWUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyNTAwMDAwMDAwfQ.yamb-7MHPIgNo3bHKFU51K8q0lZARhmXeG6GknjbOFg";
