INSERT INTO companies("name", "CEO", "num_employees", "num_products", "annual_revenue", "num_countries", "head_office")
VALUES ("3M", "Ashok Sisuk", 81997, 458, 73232000, 123, "Bahringertown, United States of America"),
("Nissan", "Mohamed Cortes", 62351, 562, 49058000, 178, "State College, Sierra Leone"),
("Prada", "Hadiza Szewczyk", 25086, 417, 20503000, 31, "Frisco, Norfolk Island"),
("PayPal", "Isah Martínez", 19905, 662, 23060000, 9, "Bahringertown, Tajikistan"),
("SAP", "Gareth Stefánsson", 37310, 817, 48467000, 173, "South Darienbury, Ecuador"),
("Adobe", "Yoshiko Ágústsdóttir", 71584, 261, 24849000, 144, "Venamouth, Ethiopia"),
("Mastercard", "Pedro Őri", 68662, 621, 65238000, 38, "Bernierfurt, Sri Lanka"),
("Huawei", "Wojciech Óskarsson", 95790, 814, 86550000, 6, "Opalbury, Burkina Faso"),
("Pepsi", "Shay Atieno", 34814, 748, 35155000, 89, "West Estaton, Virgin Islands, U.S."),
("Canon", "Nobuko Zieliński", 34816, 409, 20363000, 28, "North Braulio, New Caledonia");

INSERT INTO employees("email", "phone", "first_name", "last_name", "address", "job_title", "department", "age", "years_exp", "salary", "office", "strength", "fav_drink")
VALUES ("nicola_baker813@aim.io", "+595(523)416 073", "Nicola", "Baker", "1125 Price Spring, New Wallaceberg, Angola", "Forward Research Coordinator", "Markets", 66, 28, 302000, "Durwardton, Peru", "Brand development", "Black Russian"),
("garethschmidt@hotmail.io", "+1(829)185 4155", "Gareth", "Schmidt", "728 Howell Vista, Tallahassee, Lao Peoples Democratic Republic", "Legacy Data Director", "Response", 63, 5, 67000, "Port Adalberto, Guinea", "Enterprise resource planning", "Gin and Tonic"),
("carolinemagomedov@alice.biz", "+1(671)209 9649", "Caroline", "Magomedov", "823 Forest Path, West Dellside, Anguilla", "Global Configuration Executive", "Interactions", 58, 22, 192000, "Opalbury, Sierra Leone", "Human resources", "Creme de Menthe"),
("minsu314@chello.org", "+49(233)694 4284", "Min", "Su", "563 Antonietta Highway, Tabithaville, Montenegro", "Direct Web Engineer", "Paradigm", 58, 19, 169000, "Lake Anthony, Ecuador", "Negotiation", "Red Wine"),
("koichi.wagner@sbcglobal.net", "+225 86 803 681", "Koichi", "Wagner", "681 Schumm Land, Port Amie, Peru", "Regional Accounts Associate", "Usability", 26, 3, 49000, "New Wallaceberg, France", "Storytelling", "White Lady"),
("rakesh_koster@alice.org", "+689 00 10 78", "Rakesh", "Koster", "369 Graham Walks, Aliso Viejo, Peru", "Internal Configuration Agent", "Factors", 20, 0, 30000, "North Braulio, Chile", "Enterprise resource planning", "Bloody Mary"),
("nkosinathi.eliyahu774@free.dev", "+352 2963 287", "Nkosinathi", "Eliyahu", "1061 Rohan Tunnel, Cruzshire, Canada", "Direct Brand Analyst", "Assurance", 63, 28, 262000, "Glen Burnie, Russian Federation", "Empathy", "Passion Fruit Pucker"),
("sawat+hassan178@free.biz", "+90(312)991 9406", "Sawat", "Hassan", "1232 Laurianne Glens, Frisco, Vanuatu", "Dynamic Communications Director", "Data", 39, 8, 95000, "East Filibertofurt, Ethiopia", "Teamwork", "Cocktail"),
("themba_hahn@att.biz", "+234(415)667 1118", "Themba", "Hahn", "455 Conner Vista, Williemouth, Switzerland", "Lead Solutions Consultant", "Paradigm", 50, 16, 159000, "Cuyahoga Falls, Panama", "Decision making", "Pineapple Soda"),
("bongani.ostrowski@wanadoo.com", "+378 6852 895362", "Bongani", "Ostrowski", "122 King Springs, Murray, Russian Federation", "Global Functionality Manager", "Functionality", 21, 0, 30000, "North Nona, Cyprus", "Collaboration", "Gin");

INSERT INTO products("manufacturer", "name", "sku", "description", "category", "retail", "cost", "profit_margin", "rating", "rating_count")
VALUES ("Accenture", "name", "d0843522-7b93-4b50-9b10-af9b8ad39f53", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Sporting Goods", 325, 172.63, 88.2639170480218, "0.8", "8460"),
("Land Rover", "name", "37b5cd7f-f785-48af-b54f-6850a406ebba", "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "CDs & Vinyl", 295, 39.04, 655.6352459016395, "4.7", "8279"),
("Prada", "name", "4cf03af3-b80a-4544-a184-1a8fa34b754a", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Kindle", 755, 656.49, 15.005559871437491, "0.1", "9382"),
("Huawei", "name", "00c0d9c7-33e7-44fb-8bab-34f15688a917", "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Grocery", 925, 467, 98.07280513918629, "2.8", "7549"),
("American Express", "name", "ecb6c9f5-dc23-417f-a0b1-32905fcd1bb1", "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Crafts", 820, 358.55, 128.6989262306512, "1.6", "9165"),
("Land Rover", "name", "d02789f4-8178-4987-9cb2-0dad37de21dc", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Musical Instruments", 125, 71.43, 74.99650006999859, "1.2", "8683"),
("FedEx", "name", "41879fbe-ec3f-4ed9-8640-2b4161283464", "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Kindle", 965, 733.98, 31.474972070083652, "3.2", "5624"),
("General Electric", "name", "3e27a209-0607-4c9f-ac65-bb2e775f1711", "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Movies & TV", 380, 341.57, 11.250988084433647, "4.3", "9754"),
("Santander", "name", "8b7773fd-0fbb-4d52-8ace-21e37afe4341", "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Smartphones & Accessories", 585, 40.36, 1349.4549058473738, "4.1", "2155"),
("Adidas", "name", "6ffed044-31a9-4cb5-999e-5cd7bc5b8c9a", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Books", 425, 305.51, 39.11164937317928, "4", "7150");
