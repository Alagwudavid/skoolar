-- Enable Realtime for messages table
begin;
  -- remove the table from the publication if it already exists to avoid errors
  -- drop publication if exists supabase_realtime; 
  -- create publication supabase_realtime for all tables; -- This is usually default but dangerous to reset
  
  -- Safer:
  alter publication supabase_realtime add table messages;
commit;
