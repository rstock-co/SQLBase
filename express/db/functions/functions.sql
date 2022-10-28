CREATE OR REPLACE FUNCTION update_changetimestamp_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_orders_changetimestamp BEFORE UPDATE ON databases FOR EACH ROW
EXECUTE PROCEDURE update_changetimestamp_column();
