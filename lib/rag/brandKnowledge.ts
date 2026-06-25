import { BRAND_KNOWLEDGE_EXTRA } from "@/lib/rag/brandKnowledgeExtra";
import type { BrandKnowledgeEntry } from "@/lib/rag/brandTypes";

export type { BrandKnowledgeEntry } from "@/lib/rag/brandTypes";

export const BRAND_KNOWLEDGE: BrandKnowledgeEntry[] = [
  {
    make: "Skoda",
    aliases: ["škoda", "шкода", "skoda", "Шкода", "Škoda", "Laurin & Klement", "Laurin and Klement"],
    country: "Чехия",
    founded: "1895 (като Laurin & Klement)",
    earlyHistory:
      "Škoda започва през 1895 г. в Млада Болеслав като Laurin & Klement — първо велосипеди под марката Slavia, после моторни велосипеди. През 1905 г. Laurin & Klement произвежда първия си автомобил Voiturette A с двуцилиндров двигател. До 1914 г. фирмата изгражда серия от малки и средни автомобили и започва износ. По време на Първата световна война производството е насочено към военна техника. През 1925 г. Laurin & Klement се слива с машиностроителния гигант Škoda Works от Пилзен — оттогава автомобилите носят името Škoda. В началото на марката Škoda се произвеждат модели като Škoda 422, Popular, Rapid и Favorit (междувоенните).",
    classicEra:
      "Междувоенни и следвоенни Škoda: Popular, Rapid, Superb (първо поколение), Tudor, Spartak. След 1945 г.: Octavia (1959), Felicia, 1000 MB, 110 R, 120, Favorit (1987). Тези модели са важни за разбиране на чешката автомобилна школа — здрави, практични, с акцент върху достъпна конструкция.",
    heritage:
      "Škoda е една от най-старите непрекъснати автомобилни марки в света. След 1991 г. е част от Volkswagen Group, но запазва силно присъствие в Централна Европа. В България Škoda е сред най-разпознаваемите марки от социалистическата и следприватизационната ера.",
  },
  {
    make: "Volkswagen",
    aliases: ["vw", "фолксваген", "волксваген", "Фолксваген"],
    country: "Германия",
    founded: "1937",
    earlyHistory:
      "Volkswagen е основан през 1937 г. с идеята за достъпен народен автомобил (Volks-Wagen). Инженерът Ferdinand Porsche разработва концепцията, която води до KdF-Wagen. След Втората световна война фабриката в Wolfsburg е възстановена под британско управление и започва масово производство на Beetle (Käfer). В началото на марката VW произвежда основно Beetle, Type 2 (Bus) и военни деривати — проста, надеждна механика с въздушно охлаждан двигател отзад.",
    classicEra:
      "Класически VW: Beetle, Karmann Ghia, Type 2 (T1/T2 Bus), Type 3 (1500/1600), Golf Mk1 (1974) променя посоката към предно предаване. VW е символ на следвоенното възстановяване и масовата мобилност.",
    heritage:
      "Днес Volkswagen Group включва Audi, Porsche, Škoda, SEAT, Bentley и др. Марката VW остава централна за европейската автомобилна индустрия.",
  },
  {
    make: "BMW",
    aliases: ["бмв", "БМВ", "bayerische motoren werke"],
    country: "Германия",
    founded: "1916",
    earlyHistory:
      "BMW (Bayerische Motoren Werke) е основана през 1916 г. и в началото произвежда авиационни двигатели. След Първата световна война произвежда мотоциклети (R32 от 1923 г.) и по-късно автомобили. Ранните BMW автомобили включват BMW 3/15 (лиценз Dixi), BMW 303 (първият с характерната бъбър решетка), BMW 327 и BMW 328 — последният е легендарен в състезанията преди войната. След WWII BMW възстановява производството с малки модели като 501/502 и по-късно New Class (1500/1600/2002).",
    classicEra:
      "Класически BMW: 2002, 3.0 CS/CSL, E30 M3, E28 M5, 507. „Ultimate Driving Machine“ идва от фокуса върху шаси и баланс още от 60-те и 70-те.",
    heritage:
      "BMW е водеща премиум марка със силна моторспортна идентичност — DTM, Formula 1 история, M Division от 1972 г.",
  },
  {
    make: "Mercedes-Benz",
    aliases: ["мерцедес", "мерcedes", "benz", "мерцедес-бенц", "Мерцедес"],
    country: "Германия",
    founded: "1926 (слияние Benz + Daimler)",
    earlyHistory:
      "Корените на Mercedes-Benz са в Karl Benz (Patent-Motorwagen, 1886) и Gottlieb Daimler/Maybach. През 1926 г. се създава Mercedes-Benz. В началото марката произвежда луксозни и спортни автомобили, както и комерсиални. Ранни икони: 500K/540K, 170V, 300SL Gullwing. След войната — възстановяване с 170, 180, 190SL и легендарния 300SL.",
    classicEra:
      "Класически Mercedes: 300SL, W113 Pagoda, W108/W109, W123 (особено 240D), W126 S-Class. Символ на качество, инженерство и статус.",
    heritage:
      "Mercedes-Benz е една от най-старите и най-уважавани автомобилни марки, със силно присъствие в лукса, безопасността и моторните спортове.",
  },
  {
    make: "Audi",
    aliases: ["ауди", "Ауди", "auto union"],
    country: "Германия",
    founded: "1909 (Audi), 1932 (Auto Union)",
    earlyHistory:
      "Audi е основана от August Horch през 1909 г. Името Audi идва от латинското „audi“ (слушам). През 1932 г. Audi се обединява с DKW, Horch и Wanderer в Auto Union — логото с четирите пръстена. Auto Union произвежда състезателни болиди и серийни модели с предно и задно предаване. След WWII производството в Ингольштадт възстановява DKW и по-късно Audi F103. Audi 80 и Quattro (1980) дефинират съвременната марка.",
    classicEra:
      "Класически Audi: NSU Ro 80, Audi 100, Ur-Quattro, Sport Quattro S1. Quattro системата променя рали спорта и пътните автомобили.",
    heritage:
      "Audi е премиум марка във VW Group, известна с Quattro, дизайн и технологии.",
  },
  {
    make: "Porsche",
    aliases: ["порше", "Порше"],
    country: "Германия",
    founded: "1931 (Porsche design office)",
    earlyHistory:
      "Porsche като конструкторска къща е основана от Ferdinand Porsche през 1931 г. Участва в разработката на Auto Union Grand Prix болиди и Volkswagen Beetle. След войната Ferdinand Porsche и синът му Ferry създават Porsche 356 (1948) — първият сериен спортен автомобил на марката, базиран на VW механика. 356 поставя основите на философията: лекота, въздушно охлаждан боксер, спортно шаси.",
    classicEra:
      "Класически Porsche: 356, 550 Spyder, 911 (1964), 914, 930 Turbo, 959. 911 е най-дълголетният спортен дизайн в историята.",
    heritage:
      "Porsche е синоним на спортни и колекционерски автомобили с изключителна стойност на пазара.",
  },
  {
    make: "Ford",
    aliases: ["форд", "Форд"],
    country: "САЩ",
    founded: "1903",
    earlyHistory:
      "Ford Motor Company е основана от Henry Ford през 1903 г. Ранните модели включват Model A, Model N и Model K. През 1908 г. Model T революционизира индустрията с поточна линия и достъпна цена — „автомобил за масите“. В началото Ford произвежда основно Model T и комерсиални варианти, после Model A (1927) и V8 модели от 32-ра година.",
    classicEra:
      "Класически Ford: Model T, Model A, 1932 V8, Mustang (1964), Thunderbird, GT40. Mustang създава сегмента pony car.",
    heritage:
      "Ford е сред най-големите автомобилни групи в света, със силна американска и европейска история.",
  },
  {
    make: "Chevrolet",
    aliases: ["шевролет", "Шевролет", "chevy"],
    country: "САЩ",
    founded: "1911",
    earlyHistory:
      "Chevrolet е основана от Louis Chevrolet и William C. Durant през 1911 г. Ранните модели са малки и средни автомобили с акцент върху надеждност и състезателен дух. Серия H и D са сред първите успешни модели. Chevrolet бързо става масов бренд в GM портфолиото и конкурира Ford с по-мощни и по-стилни предложения.",
    classicEra:
      "Класически Chevrolet: Bel Air, Impala, Corvette (1953), Camaro, Chevelle, Nova. Corvette е най-дълголетната американска спортна кола.",
    heritage:
      "Chevrolet е масовата марка на General Motors с огромно присъствие в САЩ и глобално.",
  },
  {
    make: "Ferrari",
    aliases: ["ферари", "Ферари"],
    country: "Италия",
    founded: "1947 (като Ferrari S.p.A.)",
    earlyHistory:
      "Enzo Ferrari работи с Alfa Romeo (Scuderia Ferrari) преди да основе собствена фирма през 1947 г. Първият сериен Ferrari е 125 S (1947) с V12 двигател. В началото Ferrari произвежда малки серии състезателни и пътни спортни автомобили, фокусирани върху моторните спортове и ексклузивност.",
    classicEra:
      "Класически Ferrari: 250 GTO, 275 GTB, Daytona, Dino, F40, Testarossa. Колекционерската стойност е сред най-високите в света.",
    heritage:
      "Ferrari е символ на италианските спортни автомобили и Formula 1 доминация.",
  },
  {
    make: "Lamborghini",
    aliases: ["ламборгини", "Ламборгини"],
    country: "Италия",
    founded: "1963",
    earlyHistory:
      "Ferruccio Lamborghini произвежда трактори преди да основа Automobili Lamborghini през 1963 г. Първият модел е 350 GT, последван от Miura (1966) — първият сериен средно-разположен суперкар. В началото Lamborghini се конкурира с Ferrari чрез екстремен дизайн и мощни двигатели.",
    classicEra:
      "Класически Lamborghini: Miura, Countach, Diablo, Espada. Дизайнът на Marcello Gandini дефинира суперкарите.",
    heritage:
      "Lamborghini е икона на суперкарите, днес част от VW Group (с Audi).",
  },
  {
    make: "Jaguar",
    aliases: ["ягуар", "Ягуар"],
    country: "Великобритания",
    founded: "1922 (като Swallow Sidecar)",
    earlyHistory:
      "Jaguar произхожда от Swallow Sidecar Company (1922), после SS Cars. През 1935 г. се появява името Jaguar. Преди войната SS/Jaguar произвежда спортни седани и купета. След войната — XK120 (1948) установява репутация за скорост и стил. В началото марката комбинира лукс и спортни качества на достъпна за времето цена.",
    classicEra:
      "Класически Jaguar: E-Type, XK серия, Mk II, XJ6, D-Type. E-Type е сред най-красивите автомобили на 60-те.",
    heritage:
      "Jaguar е британска луксозна и спортна марка с богата състезателна история.",
  },
  {
    make: "Toyota",
    aliases: ["тойота", "Тойота"],
    country: "Япония",
    founded: "1937",
    earlyHistory:
      "Toyota Motor Corporation е основана през 1937 г., но корените са в Toyoda Automatic Loom. Първият пътен автомобил е AA (1936). В началото Toyota произвежда малки семейни автомобили за японския пазар, с фокус върху надеждност и ефективност. След войната възстановява производството и изгражда репутация за качество.",
    classicEra:
      "Класически/култови Toyota: 2000GT, Celica, AE86 Corolla, Land Cruiser FJ40, Supra. Land Cruiser е легенда за издръжливост.",
    heritage:
      "Toyota е най-големият автомобилен производител в света по обем, лидер в хибридите (Prius).",
  },
  {
    make: "Honda",
    aliases: ["хонда", "Хонда"],
    country: "Япония",
    founded: "1948",
    earlyHistory:
      "Honda започва с мотоциклети (1948) под Soichiro Honda. Първият автомобил е T360 камионче (1963), а първата масова кола — N360 (1966). В началото Honda произвежда малки, икономични автомобили за Япония, с иновативни двигатели и мотоциклетна философия за надеждност.",
    classicEra:
      "Класически Honda: Civic (1972), NSX (1990), S2000, Integra Type R. NSX доказва, че японски суперкар може да конкурира Европа.",
    heritage:
      "Honda е известна с VTEC двигатели, мотоциклети и F1 история.",
  },
  {
    make: "Nissan",
    aliases: ["нисан", "Нисан", "datsun"],
    country: "Япония",
    founded: "1933 (като Jidosha Seizo, после Nissan/Datsun)",
    earlyHistory:
      "Nissan произхожда от Datsun марката. Ранните Datsun модели са малки и достъпни автомобили. През 30-те и 40-те години компанията произвежда семейни модели за Япония. След войната Datsun е експортният бранд — 510, 240Z (Fairlady Z) поставят основите на спортната репутация.",
    classicEra:
      "Класически Nissan/Datsun: 240Z, Skyline GT-R (R32/R34), Silvia. GT-R е „Godzilla“ в рали и тунинг културата.",
    heritage:
      "Nissan е глобален играч със силна SUV и електрическа линия (Leaf).",
  },
  {
    make: "Peugeot",
    aliases: ["пежо", "Пежо"],
    country: "Франция",
    founded: "1810 (като мелница, автомобили от 1889)",
    earlyHistory:
      "Peugeot е сред най-старите индустриални марки. Първият им автомобил е парно-задвижван (1889), после бензинови модели от 1890-те. В началото Peugeot произвежда серия от малки ветеринарни и семейни автомобили, като Type 3. Ранната философия: практичност и издръжливост.",
    classicEra:
      "Класически Peugeot: 404, 504 (легенда в Африка), 205 GTI, 504 Coupe. 504 е символ на надеждност.",
    heritage:
      "Peugeot е част от Stellantis, силна в Европа и Африка.",
  },
  {
    make: "Renault",
    aliases: ["рено", "Рено"],
    country: "Франция",
    founded: "1899",
    earlyHistory:
      "Renault е основан от Louis, Marcel и Fernand Renault през 1899 г. Първият модел е Voiturette Type A. В началото Renault произвежда малки автомобили и таксита, бързо навлиза в състезания. Marcel Renault загива в състезание през 1903 г. До Първата световна война Renault е сред водещите френски производители.",
    classicEra:
      "Класически Renault: 4CV, Dauphine, R8 Gordini, Alpine A110, R5 Turbo. Alpine A110 е рали икона.",
    heritage:
      "Renault е национален френски производител със силна електрическа и комерсиална линия.",
  },
  {
    make: "Citroen",
    aliases: ["ситроен", "Ситроен", "citroën"],
    country: "Франция",
    founded: "1919",
    earlyHistory:
      "Citroën е основана от André Citroën през 1919 г. Първият модел е Type A. Citroën въвежда масово производство и маркетинг иновации във Франция. В началото произвежда достъпни автомобили с акцент върху серийност и надеждност. Traction Avant (1934) революционизира с предно предаване и носеща каросерия.",
    classicEra:
      "Класически Citroën: Traction Avant, 2CV, DS (1955), SM, CX. DS е шедьовър на дизайн и окачване.",
    heritage:
      "Citroën е известна с смели инженерни решения и комфорт.",
  },
  {
    make: "Fiat",
    aliases: ["фиат", "Фиат"],
    country: "Италия",
    founded: "1899",
    earlyHistory:
      "Fiat (Fabbrica Italiana Automobili Torino) е основана през 1899 г. Първият модел е 3.5 HP. В началото Fiat произвежда малки автомобили за италианския пазар и бързо става доминиращ производител в Италия. Ранни модели включват Fiat Zero, 501 и 509.",
    classicEra:
      "Класически Fiat: 500 (Topolino и Nuova 500), 124 Spider, 127, X1/9, Dino Coupe. 500 е икона на италианската мобилност.",
    heritage:
      "Fiat е част от Stellantis, контролира Alfa Romeo, Lancia исторически и др.",
  },
  {
    make: "AlfaRomeo",
    aliases: ["alfa romeo", "алфа", "Алфа Ромео", "алфа romeo"],
    country: "Италия",
    founded: "1910",
    earlyHistory:
      "Alfa Romeo произхожда от ALFA (Anonima Lombarda Fabbrica Automobili, 1910). След Първата световна война Nicola Romeo поема контрола — Alfa Romeo. В началото произвежда спортни и луксозни автомобили със състезателен фокус. Ранни модели: 24 HP, RL, 6C серия.",
    classicEra:
      "Класически Alfa Romeo: Giulietta, Giulia, Spider Duetto, GTV, Montreal. „Cuore sportivo“ — сърце на спортна марка.",
    heritage:
      "Alfa Romeo е премиум спортна марка в Stellantis с богата състезателна история.",
  },
  {
    make: "Opel",
    aliases: ["опел", "Опел"],
    country: "Германия",
    founded: "1862 (автомобили от 1899)",
    earlyHistory:
      "Opel започва като производител на шивашки машини и велосипеди. Първият автомобил е Opel Patentmotorwagen System Lutzmann (1899). В началото Opel произвежда достъпни семейни автомобили и става най-големият германски производител преди WWII. След войната — масови модели за средния клас.",
    classicEra:
      "Класически Opel: Kadett, GT, Manta, Ascona, Omega. Opel GT е „mini Corvette“ на Европа.",
    heritage:
      "Opel е част от Stellantis (преди GM Europe), силна в Германия и Източна Европа.",
  },
  {
    make: "Seat",
    aliases: ["сеат", "Сеат"],
    country: "Испания",
    founded: "1950",
    earlyHistory:
      "SEAT (Sociedad Española de Automóviles de Turismo) е основана през 1950 г. като испански национален производител. Първият модел Seat 1400 е базиран на Fiat дизайн. В началото SEAT произвежда лицензни Fiat модели адаптирани за Испания — 600, 850, 124, 127. Това изгражда испанската автомобилна индустрия.",
    classicEra:
      "Класически SEAT: 600, 850 Sport, 124, Ibiza Mk1 (с System Porsche дизайн). Ibiza поставя основата на модерната марка.",
    heritage:
      "SEAT е част от VW Group, с фокус върху дизайн и младата аудитория в Европа.",
  },
  {
    make: "Dacia",
    aliases: ["дачия", "Дачия"],
    country: "Румъния",
    founded: "1966",
    earlyHistory:
      "Dacia е основана през 1966 г. в Румъния. Първият модел Dacia 1100 е базиран на Renault 8. В началото Dacia произвежда лицензни Renault модели — 1300 (на база Renault 12) става икона в социалистическия блок, включително износ към България и други страни.",
    classicEra:
      "Класически Dacia: 1300, 1310, Pick-Up. Символ на достъпна мобилност в Източна Европа.",
    heritage:
      "Днес Dacia е част от Renault Group, лидер в достъпните SUV (Duster).",
  },
  {
    make: "Volvo",
    aliases: ["волво", "Волво"],
    country: "Швеция",
    founded: "1927",
    earlyHistory:
      "Volvo (лат. „аз търкалям“) произвежда първия си автомобил ÖV4 (1927) в Гьотеборг. В началото Volvo произвежда здрави, безопасни семейни автомобили за суровия скандинавски климат — PV4, PV36, Amazon (120). Философията за безопасност започва още в ранните години.",
    classicEra:
      "Класически Volvo: Amazon, P1800, 240, 850 T-5R. P1800 е свързан с The Saint.",
    heritage:
      "Volvo е символ на безопасност и премиум семейни автомобили (днес Geely).",
  },
  {
    make: "Saab",
    aliases: ["сааб", "Сааб"],
    country: "Швеция",
    founded: "1945 (автомобили)",
    earlyHistory:
      "SAAB (Svenska Aeroplan AB) произвежда самолети преди автомобили. Първият прототип е Ursaab (1946), серийният Saab 92 (1949) е с аеродинамичен дизайн и двутактов двигател. В началото Saab произвежда неортодоксални, инженерно ориентирани автомобили с фокус върху безопасност и зимна употреба.",
    classicEra:
      "Класически Saab: 96, 99, 900 Turbo, 9000. Turbo технологията е сред ранните масови приложения.",
    heritage:
      "Saab спря производство на автомобили (2011), но остава култова марка за ентусиасти.",
  },
  {
    make: "Mazda",
    aliases: ["мазда", "Мазда"],
    country: "Япония",
    founded: "1920 (като Toyo Cork Kogyo, автомобили от 1931)",
    earlyHistory:
      "Mazda започва с машинни части и трицикли. Първият автомобил е Mazda-Go (1931). В началото компанията произвежда малки комерсиални и пътни превозни средства. След войната развива ротари (Wankel) двигатели — уникална специализация в индустрията.",
    classicEra:
      "Класически Mazda: Cosmo Sport, RX-7, MX-5 Miata (1989), 323 GTX. MX-5 възродява достъпния roadster.",
    heritage:
      "Mazda е известна с ротари двигатели и шофьорски автомобили.",
  },
  {
    make: "Subaru",
    aliases: ["субару", "Субару"],
    country: "Япония",
    founded: "1953",
    earlyHistory:
      "Subaru е автомобилният бранд на Fuji Heavy Industries (сега Subaru Corporation). Първият модел е Subaru 1500 (1954). В началото Subaru произвежда малки семейни автомобили. Уникалната симетрична пълна задвижваща система (Symmetrical AWD) и боксер двигателите стават търговска марка по-късно.",
    classicEra:
      "Класически Subaru: 360, Leone, Impreza WRX STI, SVX. WRX е рали легенда.",
    heritage:
      "Subaru е нишов производител с лоялна общност и AWD фокус.",
  },
  {
    make: "Mitsubishi",
    aliases: ["мицубиши", "Мицубиши"],
    country: "Япония",
    founded: "1917 (Mitsubishi Model A)",
    earlyHistory:
      "Mitsubishi произвежда първия сериен японски автомобил Model A през 1917 г. След войната възстановява производството с малки и средни модели. В началото фокусът е върху практични семейни и комерсиални автомобили за японския пазар.",
    classicEra:
      "Класически Mitsubishi: Lancer Evolution, 3000GT, Pajero, Galant VR-4. Evo доминира в рали.",
    heritage:
      "Mitsubishi е глобален играч със силни SUV и пикапи.",
  },
  {
    make: "Hyundai",
    aliases: ["хюндай", "Хюндай", "хендай"],
    country: "Южна Корея",
    founded: "1967",
    earlyHistory:
      "Hyundai Motor Company е основана през 1967 г. Първият модел е Cortina (лиценз Ford). Pony (1975) е първият собствен дизайн — с дизайн от Giorgetto Giugiaro. В началото Hyundai произвежда достъпни автомобили за корейския и износния пазар.",
    classicEra:
      "Hyundai развива репутация за надеждност и стойност. Класически ранни модели: Pony, Stellar, Excel.",
    heritage:
      "Днес Hyundai-Kia е сред топ 5 глобални производители с премиум линия Genesis.",
  },
  {
    make: "Kia",
    aliases: ["киа", "Киа"],
    country: "Южна Корея",
    founded: "1944 (автомобили от 1974)",
    earlyHistory:
      "Kia започва с производство на стоманени части и велосипеди. Първият автомобил е Brisa (лиценз Mazda, 1974). В началото Kia произвежда малки и достъпни автомобили за Корея, после глобална експанзия.",
    classicEra:
      "Ранни Kia: Brisa, Pride (Festa), Sephia. Модерната марка се трансформира с дизайн от Peter Schreyer.",
    heritage:
      "Kia е част от Hyundai Motor Group с амбициозни електрически модели.",
  },
  {
    make: "Dodge",
    aliases: ["додж", "Додж"],
    country: "САЩ",
    founded: "1900",
    earlyHistory:
      "Dodge Brothers започва с доставка на части за автомобилни производители. Първият собствен автомобил е Dodge Model 30 (1914). В началото Dodge произвежда здрави, мощни масови автомобили с репутация за издръжливост.",
    classicEra:
      "Класически Dodge: Charger, Challenger, Coronet, Viper. Muscle car икона.",
    heritage:
      "Dodge е част от Stellantis (преди Chrysler), символ на американска мощ.",
  },
  {
    make: "Jeep",
    aliases: ["джип", "Джип"],
    country: "САЩ",
    founded: "1941 (Willys MB)",
    earlyHistory:
      "Jeep произхожда от военния Willys MB (1941) — легендарният 4x4 на Втората световна война. Името Jeep идва от военен жаргон. След войната CJ (Civilian Jeep) серията отваря сегмента за офроуд автомобили за граждани.",
    classicEra:
      "Класически Jeep: Willys MB, CJ-5, CJ-7, Wagoneer, Cherokee XJ. XJ дефинира SUV сегмента.",
    heritage:
      "Jeep е глобален бранд за офроуд и SUV (Stellantis).",
  },
  {
    make: "LandRover",
    aliases: ["land rover", "ленд ровър", "range rover"],
    country: "Великобритания",
    founded: "1948",
    earlyHistory:
      "Land Rover Series I (1948) е създаден от Rover Company за селско стопанство и военни нужди след войната. В началото Land Rover произвежда изключително издръжливи 4x4 с алуминиеви каросерии и проста механика.",
    classicEra:
      "Класически Land Rover: Series I/II/III, Defender, Range Rover (1970), Discovery. Range Rover създава луксозния SUV.",
    heritage:
      "Land Rover е премиум офроуд марка (Jaguar Land Rover / Tata).",
  },
  {
    make: "Bentley",
    aliases: ["бентли", "Бентли"],
    country: "Великобритания",
    founded: "1919",
    earlyHistory:
      "W.O. Bentley основава Bentley Motors през 1919 г. Ранните Bentley са луксозни и състезателни — победи в Le Mans през 20-те. В началото марката произвежда мощни, изключително качествени автомобили за богати клиенти и състезания.",
    classicEra:
      "Класически Bentley: 3 Litre, Blower Bentley, R-Type Continental, Turbo R. Символ на британски лукс.",
    heritage:
      "Bentley е част от VW Group, конкурира Rolls-Royce в ултра-лукса.",
  },
  {
    make: "Maserati",
    aliases: ["мазерати", "Мазерати"],
    country: "Италия",
    founded: "1914",
    earlyHistory:
      "Maserati е основана от братьята Maserati в Болоня през 1914 г. Първоначално произвежда spark plugs, после състезателни и пътни автомобили. В началото Maserati е състезателен бранд с победи в Grand Prix и луксозни серийни модели.",
    classicEra:
      "Класически Maserati: 250F, Ghibli, Miura-ера конкуренти, Bora, Merak, Biturbo. Символ на италианска елегантност и звук.",
    heritage:
      "Maserati е луксозна спортна марка в Stellantis.",
  },
  {
    make: "Mini",
    aliases: ["мини", "Мини", "mini cooper"],
    country: "Великобритания",
    founded: "1959 (Mini марка)",
    earlyHistory:
      "Mini е създаден от BMC като отговор на енергийната криза (1959) — дизайн от Alec Issigonis. Първият Austin Mini/ Morris Mini-Minor е с попречен двигател и компактни размери. В началото Mini произвежда достъпни малки коли за британските семейства.",
    classicEra:
      "Класически Mini: Cooper S, Cooper Works. Състезателни победи в Rallye Monte Carlo.",
    heritage:
      "Mini е премиум компактна марка в BMW Group.",
  },
  {
    make: "Tesla",
    aliases: ["тесла", "Тесла"],
    country: "САЩ",
    founded: "2003",
    earlyHistory:
      "Tesla Motors е основана през 2003 г. Първият продукт е Roadster (2008) на база Lotus Elise с електрическо задвижване. В началото Tesla произвежда малки серии спортни EV, после Model S (2012) отваря масовия луксозен EV сегмент.",
    classicEra:
      "Култови Tesla: Roadster, Model S P85D, Model 3. Tesla популяризира OTA ъпдейти и Supercharger мрежата.",
    heritage:
      "Tesla е лидер в масовите електрически автомобили и софтуерно-ориентирани коли.",
  },
  {
    make: "Pontiac",
    aliases: ["понтиак", "Понтиак"],
    country: "САЩ",
    founded: "1926",
    earlyHistory:
      "Pontiac е създаден като компаньон марка на Oakland в GM през 1926 г. В началото произвежда достъпни шестцилиндрови автомобили между Chevrolet и Oldsmobile по цена.",
    classicEra:
      "Класически Pontiac: GTO (1964), Firebird, Trans Am, Bonneville. GTO стартира muscle car ерата.",
    heritage:
      "Pontiac е закрит (2010), но остава култова марка за колекционери.",
  },
  {
    make: "Cadillac",
    aliases: ["кадилак", "Кадилак"],
    country: "САЩ",
    founded: "1902",
    earlyHistory:
      "Cadillac е основан от Henry Leland през 1902 г., наименован в чест на основателя на Детройт. В началото Cadillac произвежда прецизни, луксозни автомобили и печели награди за стандартизация на частите.",
    classicEra:
      "Класически Cadillac: V16, Eldorado, Coupe de Ville, Fleetwood. Символ на американски лукс.",
    heritage:
      "Cadillac е премиум марка на GM с фокус върху лукс и електрификация (Lyriq).",
  },
  {
    make: "Chrysler",
    aliases: ["крайслер", "Крайслер"],
    country: "САЩ",
    founded: "1925",
    earlyHistory:
      "Chrysler Corporation е основана от Walter P. Chrysler през 1925 г. Първият модел Chrysler Six предлага напредничава инженерия на достъпна цена. В началото марката бързо набира пазарен дял с иновации в окачване и двигатели.",
    classicEra:
      "Класически Chrysler: Imperial, 300 Letter Series, Airflow, PT Cruiser (ретро).",
    heritage:
      "Chrysler е част от Stellantis в САЩ.",
  },
  {
    make: "Suzuki",
    aliases: ["сузуки", "Сузуки"],
    country: "Япония",
    founded: "1909 (автомобили от 1955)",
    earlyHistory:
      "Suzuki започва с текстилни машини и мотоциклети. Първият автомобил е Suzulight (1955) — компактен японски автомобил. В началото Suzuki произвежда малки, икономични коли (360cc клас), после глобални модели.",
    classicEra:
      "Класически Suzuki: Jimny, Swift GTi, Cappuccino. Jimny е компактен офроуд култ.",
    heritage:
      "Suzuki е лидер в малки автомобили и мотоциклети, силно в Индия.",
  },
  ...BRAND_KNOWLEDGE_EXTRA,
];

export const BRAND_ALIAS_MAP: Record<string, string> = {};

for (const brand of BRAND_KNOWLEDGE) {
  BRAND_ALIAS_MAP[brand.make.toLowerCase()] = brand.make;
  for (const alias of brand.aliases) {
    BRAND_ALIAS_MAP[alias.toLowerCase()] = brand.make;
  }
}
