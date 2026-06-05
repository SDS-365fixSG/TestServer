import sqlite3

conn = sqlite3.connect('fix365.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        service TEXT,
        location TEXT,
        date TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

cursor.execute('''
    INSERT INTO bookings (name, phone, service, location, date)
    VALUES (?, ?, ?, ?, ?)
''', ('Sarah', '+6591234567', 'Repair leaking pipe', 'Changi City Point', '2026-06-06'))

conn.commit()
conn.close()
print("Database created!")