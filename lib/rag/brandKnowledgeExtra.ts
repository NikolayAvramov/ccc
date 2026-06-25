import type { BrandKnowledgeEntry } from "@/lib/rag/brandTypes";

export const BRAND_KNOWLEDGE_EXTRA: BrandKnowledgeEntry[] = [
  // ─── ЛУКСОЗНИ И БРИТАНСКИ ───
  {
    make: "Rolls-Royce",
    aliases: ["ролс-ройс", "ролс ройс", "Rolls Royce", "Ролс-Ройс"],
    country: "Великобритания",
    founded: "1904",
    earlyHistory:
      "Rolls-Royce е основана от Charles Rolls и Henry Royce през 1904 г. Първият модел 10 hp задава стандарта „най-доброто в света“. В началото Rolls-Royce произвежда малки серии изключително прецизни луксозни автомобили и двигатели за самолети. Silver Ghost (1906) изгражда легендата за безшумност и качество.",
    classicEra:
      "Класически Rolls-Royce: Silver Ghost, Phantom I–VI, Silver Cloud, Corniche. Символ на абсолютен лукс и колекционерска стойност.",
    heritage: "Днес част от BMW Group. Еталон за ултра-луксозни автомобили.",
    models: ["Phantom", "Ghost", "Silver Shadow", "Silver Cloud", "Corniche", "Cullinan"],
  },
  {
    make: "Aston Martin",
    aliases: ["астон мартин", "Астън Мартин", "aston"],
    country: "Великобритания",
    founded: "1913",
    earlyHistory:
      "Aston Martin е основана от Lionel Martin и Robert Bamford през 1913 г. Името идва от успех на Aston Hill climb. В началото произвежда малки серии спортни автомобили за състезания и богати клиенти. Ранните модели са ръчно изработени с фокус върху елегантност и скорост.",
    classicEra:
      "Класически Aston Martin: DB4, DB5 (James Bond), DB6, V8 Vantage, Zagato. DB5 е най-разпознаваемата кола на марката.",
    heritage: "Британска луксозна спортна марка с Formula 1 история и културен статус.",
    models: ["DB5", "DB9", "DB11", "Vantage", "Vanquish", "DBX", "DBS"],
  },
  {
    make: "Lotus",
    aliases: ["лотус", "Лотус"],
    country: "Великобритания",
    founded: "1948",
    earlyHistory:
      "Lotus е основана от Colin Chapman през 1948 г. Първоначално въвежда философията „simplify, then add lightness“. В началото Lotus произвежда леки спортни автомобили и болиди за състезания — Mark серия, Elite (1957).",
    classicEra:
      "Класически Lotus: Elan, Esprit, Seven/Caterham heritage, Europa. Esprit е икона на 70-те и 80-те.",
    heritage: "Легенда в инженерството и Formula 1. Днес собственост на Geely.",
    models: ["Elan", "Esprit", "Elise", "Exige", "Evora", "Emira"],
  },
  {
    make: "McLaren",
    aliases: ["макларън", "Макларън", "mclaren"],
    country: "Великобритания",
    founded: "1963 (McLaren Racing), 1992 (McLaren Cars)",
    earlyHistory:
      "Bruce McLaren основава екипа през 1963 г. Първият пътен McLaren е F1 (1992) — централна шофьорска позиция, карбон шаси. В началото марката произвежда екстремни суперкари с технологии от Formula 1.",
    classicEra: "McLaren F1 (1990-те) е сред най-ценените суперкари. P1 дефинира хибридната хиперкола.",
    heritage: "F1 доминация и суперcar инженерство.",
    models: ["F1", "MP4-12C", "650S", "720S", "P1", "Artura", "GT"],
  },
  {
    make: "Morgan",
    aliases: ["морган", "Морган"],
    country: "Великобритания",
    founded: "1910",
    earlyHistory:
      "Morgan Motor Company в Malvern Link произвежда трицикли от 1910 г. Първият четириколесен Morgan е 4/4 (1936). В началото марката използва дървена рама и ръчна изработка — традиция, запазена и днес.",
    classicEra: "Morgan 4/4, Plus 4, Plus 8 — ретро дизайн с модерна механика. Уникален сред производителите.",
    heritage: "Независим британски производител с над 100 години история.",
    models: ["4/4", "Plus 4", "Plus 6", "Plus 8", "Aero 8"],
  },
  {
    make: "TVR",
    aliases: ["твр", "ТВР"],
    country: "Великобритания",
    founded: "1947",
    earlyHistory:
      "TVR е основана от Trevor Wilkinson в Блекпул. Първият автомобил е TVR One (1949). В началото TVR произвежда леки стъкловолокнени спортни коли с мощни двигатели — без ABS и асистенти, чисто шофьорско усещане.",
    classicEra: "TVR Griffith, Chimaera, Cerbera, Tuscan, Sagaris. Звукът на V8 и ръчно изработени коли.",
    heritage: "Култова нишова британска марка, рестартирана в нови поколения.",
    models: ["Griffith", "Chimaera", "Cerbera", "Tuscan", "Sagaris"],
  },
  {
    make: "Rover",
    aliases: ["ровър", "Ровър"],
    country: "Великобритания",
    founded: "1904",
    earlyHistory:
      "Rover Company произвежда велосипеди и мотоциклети преди автомобили. Първият Rover автомобил е 8 hp (1904). В началото Rover произвежда качествени средни клас автомобили — P серия след войната.",
    classicEra: "Rover P4, P5, P6, SD1. Land Rover произхожда от Rover. Марката спира (2005).",
    heritage: "Британска институция, погълната от BMW и после закрита.",
    models: ["P6", "SD1", "75", "200", "400", "600", "800"],
  },
  {
    make: "Triumph",
    aliases: ["триумф", "Триумф"],
    country: "Великобритания",
    founded: "1885 (автомобили от 1923)",
    earlyHistory:
      "Triumph започва с велосипеди и мотоциклети. Първият автомобил е Triumph 10/20 (1923). В началото произвежда достъпни малки коли, после спортни roadster-и след WWII — TR2, TR3.",
    classicEra: "Triumph TR3, TR4, TR6, Spitfire, Stag. TR серията е класически британски спортен автомобил.",
    heritage: "Закрита марка, силно търсена от колекционери.",
    models: ["TR3", "TR4", "TR6", "Spitfire", "Stag", "Herald", "Dolomite"],
  },
  {
    make: "MG",
    aliases: ["ем джи", "МГ", "mg"],
    country: "Великобритания",
    founded: "1924",
    earlyHistory:
      "MG (Morris Garages) е създадена от Cecil Kimber в Оксфорд. Първоначално модифицира Morris автомобили в спортни версии. В началото MG произвежда достъпни спортни roadster-и — Midget, TA, TB серии.",
    classicEra: "MG MGB, Midget, A, T-Series. MGB е най-продаваният британски спортен автомобил.",
    heritage: "Спортна марка с китайско производство днес (SAIC).",
    models: ["MGB", "Midget", "MG A", "MG TF", "MG ZT", "MG3", "MG4"],
  },
  {
    make: "Austin",
    aliases: ["остин", "Остин"],
    country: "Великобритания",
    founded: "1905",
    earlyHistory:
      "Austin Motor Company е основана от Herbert Austin. Първият модел е Austin 25/30 (1906). В началото Austin произвежда масови достъпни автомобили за британския пазар — Seven (1922) става икона на достъпната мобилност.",
    classicEra: "Austin Seven, A30, A35, Mini (с BMC), Healey Sprite. Seven е „британският Model T“.",
    heritage: "Част от BLMC/Leyland, слята в British Leyland история.",
    models: ["Seven", "A30", "A35", "A40", "Mini", "Allegro", "Maxi"],
  },
  {
    make: "Morris",
    aliases: ["морис", "Морис"],
    country: "Великобритания",
    founded: "1913",
    earlyHistory:
      "Morris Motors е основана от William Morris в Оксфорд. Първият модел е Bullnose Morris (1913). В началото Morris произвежда масови, достъпни автомобили и става най-големият британски производител между войните.",
    classicEra: "Morris Minor, Oxford, Eight, Mini (BMC). Minor е една от най-обичаните британски коли.",
    heritage: "Слята в BMC и British Leyland.",
    models: ["Minor", "Oxford", "Eight", "Marina", "Ital"],
  },
  {
    make: "Vauxhall",
    aliases: ["воксхол", "Воксхол"],
    country: "Великобритания",
    founded: "1857 (автомобили от 1903)",
    earlyHistory:
      "Vauxhall е най-старият британски производител на автомобили (1903). Първият модел е 6 hp. В началото Vauxhall произвежда спортни и луксозни автомобили, после масови семейни модели.",
    classicEra: "Vauxhall 30/98, Cresta, Victor, Cavalier. Днес Opel-базирани модели за UK пазара.",
    heritage: "Британският бранд на Stellantis/Opel.",
    models: ["Corsa", "Astra", "Insignia", "Victor", "Cresta", "Viva"],
  },

  // ─── ИТАЛИАНСКИ И ЕВРОПЕЙСКИ СПОРТНИ ───
  {
    make: "Lancia",
    aliases: ["ланча", "Ланча"],
    country: "Италия",
    founded: "1906",
    earlyHistory:
      "Lancia е основана от Vincenzo Lancia и Claudio Fogolin. Първият модел е Alfa 12 HP (под друго име). В началото Lancia произвежда иновативни автомобили — първа унитарна конструкция, първи V6. Lambda (1922) революционизира шасито.",
    classicEra: "Lancia Aurelia, Fulvia, Stratos, Delta Integrale, 037. Stratos и Delta са рали легенди.",
    heritage: "Част от Stellantis. Икона на италиански иновации и рали.",
    models: ["Lambda", "Aurelia", "Fulvia", "Stratos", "Delta", "Beta", "Thema"],
  },
  {
    make: "Bugatti",
    aliases: ["бугати", "Бугати"],
    country: "Франция",
    founded: "1909",
    earlyHistory:
      "Ettore Bugatti основава Bugatti в Молсхайм (тогава Германия, днес Франция). Първият модел е Type 13. В началото Bugatti произвежда леки, елегантни и технически прецизни автомобили за състезания и лукс.",
    classicEra: "Bugatti Type 35, Type 57, Atlantic. Type 35 е най-успешният състезателен автомобил на 20-те.",
    heritage: "Днес ултра-хиперкари под Volkswagen Group — Veyron, Chiron.",
    models: ["Type 35", "Type 57", "Atlantic", "Veyron", "Chiron", "Divo"],
  },
  {
    make: "Pagani",
    aliases: ["пагани", "Пагани"],
    country: "Италия",
    founded: "1992",
    earlyHistory:
      "Horacio Pagani работи при Lamborghini преди да основи Pagani Automobili. Първият модел Zonda C12 (1999) комбинира AMG V12 и карбон артизанство. В началото Pagani произвежда екстремно малки серии хиперкари.",
    classicEra: "Pagani Zonda, Huayra, Utopia. Ръчна изработка и дизайн на изкуство.",
    heritage: "Нишов италиански хиперкар производител.",
    models: ["Zonda", "Huayra", "Utopia"],
  },
  {
    make: "Abarth",
    aliases: ["абарт", "Абарт"],
    country: "Италия",
    founded: "1949",
    earlyHistory:
      "Carlo Abarth модифицира Fiat автомобили за състезания. В началото Abarth произвежда спортни версии на малки Fiat модели — 500, 600, 1000. Философия: малка кола, голяма мощност.",
    classicEra: "Abarth 595, 695, 124 Spider, Punto. Скорпион логото и рали успехи.",
    heritage: "Спортният бранд на Fiat/Alfa (Stellantis).",
    models: ["500", "595", "695", "124 Spider", "Punto", "Grande Punto"],
  },
  {
    make: "Alpine",
    aliases: ["алпин", "Алпин"],
    country: "Франция",
    founded: "1955",
    earlyHistory:
      "Jean Rédélé създава Alpine с модифицирани Renault. Първият модел е A106 (1955). В началото Alpine произвежда леки пластмасови/алуминиеви спортни коли за планински състезания — оттам името.",
    classicEra: "Alpine A110 (1961), A310, A610. A110 печели Monte Carlo Rally 1971.",
    heritage: "Спортният бранд на Renault.",
    models: ["A110", "A310", "A610", "A110 (нов)", "A290"],
  },
  {
    make: "DeLorean",
    aliases: ["делориан", "ДеЛориан", "dmc"],
    country: "САЩ/Северна Ирландия",
    founded: "1975",
    earlyHistory:
      "John DeLorean основава DMC след кариера в GM. DMC-12 (1981) с неръждаема стомана и gull-wing врати. В началото произвежда в Западен Бelfast един модел с V6 Renault/Volvo.",
    classicEra: "DMC-12 — култ от Back to the Future. Производството спира 1982.",
    heritage: "Култова марка с ограничено производство (~9000 броя).",
    models: ["DMC-12"],
  },
  {
    make: "Smart",
    aliases: ["смарт", "Смарт"],
    country: "Германия",
    founded: "1994",
    earlyHistory:
      "Smart е създаден от Swatch и Mercedes-Benz. Първият Fortwo (1998) е ултракомпактен градски автомобил. В началото Smart произвежда двуместни микроколи за европейските градове.",
    classicEra: "Smart Fortwo, Roadster, Forfour. Символ на паркиране в градска среда.",
    heritage: "Градска мобилност под Mercedes-Benz.",
    models: ["Fortwo", "Forfour", "Roadster", "#1", "#3"],
  },
  {
    make: "Cupra",
    aliases: ["купра", "Купра"],
    country: "Испания",
    founded: "2018 (като марка), 1996 (като подбранд SEAT)",
    earlyHistory:
      "Cupra започва като спортен отдел на SEAT (Ibiza Cupra). Като самостоятелна марка (2018) произвежда спортни и електрифицирани модели с по-премиум позициониране.",
    classicEra: "SEAT Ibiza Cupra, Leon Cupra, Formentor. Спортна ДНК от испанската сцена.",
    heritage: "Спортен бранд във VW Group.",
    models: ["Formentor", "Leon", "Born", "Ateca", "Tavascan"],
  },
  {
    make: "Tatra",
    aliases: ["татра", "Татра"],
    country: "Чехия/Чехословакия",
    founded: "1850 (автомобили от 1897)",
    earlyHistory:
      "Tatra е един от най-старите производители в света. Първият автомобил е Präsident (1897). В началото Tatra произвежда луксозни автомобили с въздушно охлаждани двигатели отзад — инженер Hans Ledwinka. T77 (1934) е аеродинамичен пионер.",
    classicEra: "Tatra 77, 87, 600, 613. Уникална архитектура с редица V8 отзад.",
    heritage: "Чешка институция, произвежда и камиони.",
    models: ["T77", "T87", "T600", "T613", "T700"],
  },
  {
    make: "Iso",
    aliases: ["изо", "Исо"],
    country: "Италия",
    founded: "1939 (автомобили от 1950-те)",
    earlyHistory:
      "Iso започва с хладилници и мотоциклети (Isetta микрокола, лицензирана на BMW). В началото на спортните автомобили произвежда GT модели с американски V8 — Rivolta, Grifo.",
    classicEra: "Iso Grifo, Rivolta, Lele. Комбинация италиански дизайн и Corvette двигатели.",
    heritage: "Нишов италиански GT производител.",
    models: ["Grifo", "Rivolta", "Lele", "Fidia"],
  },
  {
    make: "Innocenti",
    aliases: ["иноченти", "Иноченти"],
    country: "Италия",
    founded: "1947",
    earlyHistory:
      "Innocenti произвежда Lambretta скутери и лицензни Austin Mini за Италия. В началото марката сглобява Mini под името Innocenti Mini — популярни в Италия с италиански дизайн детайли.",
    classicEra: "Innocenti Mini, Regent, De Tomaso версии. Важна част от италианската мобилност.",
    heritage: "Закрита, но Mini дериватите са колекционерски.",
    models: ["Mini", "Regent", "A40", "IM3"],
  },

  // ─── ИЗТОЧНА ЕВРОПА (много важно за България) ───
  {
    make: "Lada",
    aliases: ["лада", "Лада", "ваз", "ВАЗ", "vaz", "жигули", "Жигули", "zhiguli", "Lada Zhiguli"],
    country: "Русия/СССР",
    founded: "1966 (VAZ, Жигули)",
    earlyHistory:
      "Lada (ВАЗ/Жигули) започва през 1966 г. в Толиати с лиценз на Fiat 124 — моделът ВАЗ-2101 (Жигули). В началото Lada произвежда прост, здрав задно задвижван седан за социалистическия блок. Заводът е изграден с помощта на Fiat и е сред най-големите в света. Ранните модели са 2101, 2103, 2106 — износ към България, Полша, Куба и др.",
    classicEra:
      "Класически Lada: 2101 (Жигули), 2103, 2106, 2107, Niva (4x4, 1977), Samara (2108/2109), 110/111/112, Kalina. Niva е легенда за офроуд в Източна Европа.",
    heritage:
      "Lada е символ на съветската и постсъветската автомобилна ера. В България Жигули и Нива са изключително разпространени. Днес част от Renault Group (AvtoVAZ).",
    models: ["2101", "2103", "2106", "2107", "Niva", "Samara", "2108", "2109", "Kalina", "Vesta", "Granta"],
  },
  {
    make: "Moskvich",
    aliases: ["москвич", "Москвич", "moskvitch", "Москвич"],
    country: "Русия/СССР",
    founded: "1930 (MZMA/Москвич)",
    earlyHistory:
      "Москвич произхожда от Московския завод за малки автомобили (MZMA). Първият модел е Москвич-400 (1946), базиран на Opel Kadett от преди войната. В началото Москвич произвежда малки достъпни автомобили за СССР — 401, 402, 403. Заводът в Москва става основен производител на „народни“ коли за Съюза.",
    classicEra:
      "Класически Москвич: 408, 412, 2140, 2141 (Але ко), 2142. 412 е сред най-разпространените съветски седани. В България Москвич е познат от 60-те и 70-те.",
    heritage: "Марката е рестартирана (2022) с нови модели, но класическите са култ в Източна Европа.",
    models: ["400", "401", "403", "408", "412", "2140", "2141", "2142", "3е"],
  },
  {
    make: "GAZ",
    aliases: ["газ", "ГАЗ", "volga", "Волга", "волга", "Горьковский"],
    country: "Русия/СССР",
    founded: "1932",
    earlyHistory:
      "Горьковский автомобильный завод (ГАЗ) е основан през 1932 г. с помощта на Ford. Първият модел е ГАЗ-А (лиценз Ford Model A). В началото ГАЗ произвежда масови автомобили и военни джипове — ГАЗ-67. След войната — Волга ГАЗ-21 (1956), луксозен съветски седан.",
    classicEra:
      "Класически ГАЗ/Волга: M20 Победа, 21 Волга, 24 Волга, 13 Чайка (лимузина). Волга 24 е икона на съветския среден и висок клас.",
    heritage: "ГАЗ произвежда и камиони (ГАЗель). Волга е статусен символ в СССР.",
    models: ["ГАЗ-А", "ГАЗ-67", "Победа M20", "Волга 21", "Волга 24", "Чайка", "ГАЗель"],
  },
  {
    make: "UAZ",
    aliases: ["уаз", "УАЗ", "uaz"],
    country: "Русия/СССР",
    founded: "1941",
    earlyHistory:
      "Ульяновский автомобильный завод (УАЗ) започва с военни джипове по време на войната. Гражданският УАЗ-469 (1961) е легендарен офроуд автомобил с проста механика и висока проходимост. В началото УАЗ произвежда утилитарни 4x4 за армия, село и труден терен.",
    classicEra: "УАЗ-469, 3151, Hunter, Patriot, Буханка (452). Буханка е култов микробус.",
    heritage: "Символ на руския офроуд. Разпространен в селските райони и сред ентусиасти.",
    models: ["469", "3151", "Hunter", "Patriot", "452", "Profi"],
  },
  {
    make: "ZAZ",
    aliases: ["заз", "ЗАЗ", "zaporozhets", "Запорожец", "запорожец"],
    country: "Украйна/СССР",
    founded: "1960",
    earlyHistory:
      "Запорожский автомобильный завод (ЗАЗ) произвежда Запорожец ZAZ-965 (1960) — компактен задно задвижван автомобил с въздушно охлаждан двигател, наричан „горбатый“ (камбала). В началото ЗАЗ произвежда най-малките и най-достъпни съветски автомобили за широки маси.",
    classicEra: "ZAZ-965, 966, 968, 1102 Tavria, 1105 Dana. Tavria е първият предно задвижван ЗАЗ.",
    heritage: "Символ на достъпната съветска мобилност. Популярен в Украйна и бившия СССР.",
    models: ["965", "966", "968", "1102 Tavria", "1105 Dana", "Sens"],
  },
  {
    make: "Trabant",
    aliases: ["трабант", "Трабант", "trabi", "траби"],
    country: "ГДР/Германия",
    founded: "1957",
    earlyHistory:
      "Trabant се произвежда в Sachsenring (Zwickau, ГДР). P50 (1957) с пластмасово-композитно каросерие (Duroplast) и двутактов двигател. В началото Trabant произвежда достъпни малки коли за източногерманските граждани — години на изчакване за поръчка.",
    classicEra: "Trabant P50, 601 (най-масовият), 1.1 (VW двигател). Символ на ГДР и падането на Берлинската стена.",
    heritage: "Култова марка с ограничени ресурси, но огромно културно значение.",
    models: ["P50", "P60", "601", "1.1"],
  },
  {
    make: "Wartburg",
    aliases: ["варбург", "Вартбург", "wartburg"],
    country: "ГДР/Германия",
    founded: "1956",
    earlyHistory:
      "Wartburg се произвежда в Eisenach (ГДР), на мястото на историческата BMW/DKW фабрика. Wartburg 311 (1956) с тритактов двигател от IFA. В началото Wartburg произвежда по-голям и по-комфортен източногермански автомобил от Trabant.",
    classicEra: "Wartburg 311, 353 (Knight), 1.3 (VW двигател). 353 е най-разпространеният модел.",
    heritage: "Източногерманска марка, спряна 1991. Популярна в Източна Европа.",
    models: ["311", "353", "1.3"],
  },
  {
    make: "Barkas",
    aliases: ["баркас", "Баркас"],
    country: "ГДР/Германия",
    founded: "1961",
    earlyHistory:
      "Barkas B1000 (1961) е източногермански микробус/комби от Karl-Marx-Stadt (Chemnitz). В началото Barkas произвежда утилитарни превозни средства с тритактов двигател за търговия и услуги в ГДР.",
    classicEra: "Barkas B1000 — „източногерманският Transporter“. Използван от пожарна, поща, майстори.",
    heritage: "Нишов, но култов GDR производител.",
    models: ["B1000"],
  },
  {
    make: "Zastava",
    aliases: ["застава", "Застава", "юго", "Юго", "yugo", "Yugo"],
    country: "Югославия/Сърбия",
    founded: "1953",
    earlyHistory:
      "Zastava в Крагуевац произвежда лицензни Fiat модели. Fiat 750 (1962) е сред първите. В началото Zastava произвежда достъпни автомобили за югославския пазар на база Fiat дизайн.",
    classicEra: "Zastava 101, 128, Yugo 45/55/65. Yugo е експортиран в САЩ и Европа — най-известният югославски автомобил.",
    heritage: "Сръбска марка, спряна. Yugo е културен феномен.",
    models: ["101", "128", "Yugo 45", "Yugo 55", "Florida", "Skala"],
  },
  {
    make: "FSO",
    aliases: ["фсо", "ФСО", "polski fiat", "Полски Фиат", "Warszawa"],
    country: "Полша",
    founded: "1951",
    earlyHistory:
      "Fabryka Samochodów Osobowych (FSO) във Варшава произвежда Polski Fiat 125p (1967) под лиценз. В началото FSO произвежда достъпни седани за полския и износния пазар — Warszawa, Syrena.",
    classicEra: "FSO Warszawa, Syrena, Polonez, Fiat 125p/126p. Polonez е национална икона на Полша.",
    heritage: "Полска автомобилна история, закрита като независим производител.",
    models: ["Warszawa", "Syrena", "125p", "126p", "Polonez", "Caro"],
  },
  {
    make: "Polski Fiat",
    aliases: ["полски фиат", "fiat 126p", "126p"],
    country: "Полша",
    founded: "1967",
    earlyHistory:
      "Polski Fiat произвежда лицензни Fiat модели в Полша — 125p и особено 126p (1973), компактна градска кола. В началото 126p става най-масовият автомобил в Полша и е износван в целия социалистически блок.",
    classicEra: "Fiat 125p, 126p, 127p. 126p е „полската малка кола“ — милиони произведени.",
    heritage: "Неразделна част от полската и източноевропейска автомобилна култура.",
    models: ["125p", "126p", "127p"],
  },

  // ─── АМЕРИКАНСКИ КЛАСИЦИ ───
  {
    make: "Buick",
    aliases: ["бюик", "Бюик"],
    country: "САЩ",
    founded: "1903",
    earlyHistory:
      "Buick е основана от David Dunbar Buick. Първият модел е Model B (1904). В началото Buick произвежда качествени средно-горни автомобили и става основата на General Motors (1908).",
    classicEra: "Buick Roadmaster, Riviera, GSX, Grand National. Grand National е легенда на muscle turbo ерата.",
    heritage: "Премиум марка на GM, силна в Китай днес.",
    models: ["Roadmaster", "Riviera", "Skylark", "Grand National", "Enclave", "Regal"],
  },
  {
    make: "Oldsmobile",
    aliases: ["олдсмобил", "Олдсмобил"],
    country: "САЩ",
    founded: "1897",
    earlyHistory:
      "Oldsmobile е сред най-старите американски марки (Ransom Olds). Curved Dash (1901) е първият масово произвеждан американски автомобил. В началото Oldsmobile произвежда иновативни масови модели.",
    classicEra: "Oldsmobile 442, Cutlass, Toronado (първи масов FWD в САЩ), Rocket V8.",
    heritage: "Закрита 2004. Rocket V8 popularizes high-compression engines.",
    models: ["442", "Cutlass", "Toronado", "Delta 88", "Aurora"],
  },
  {
    make: "Lincoln",
    aliases: ["линкълн", "Линкълн"],
    country: "САЩ",
    founded: "1917",
    earlyHistory:
      "Lincoln е основана от Henry Leland (същият, който създава Cadillac). Ford купува Lincoln (1922). В началото Lincoln произвежда луксозни автомобили, конкуриращи Cadillac и Packard.",
    classicEra: "Lincoln Continental, Town Car, Mark серия. Continental е американска луксозна икона.",
    heritage: "Луксозният бранд на Ford.",
    models: ["Continental", "Town Car", "Mark IV", "Navigator", "Aviator"],
  },
  {
    make: "Mercury",
    aliases: ["меркюри", "Меркури"],
    country: "САЩ",
    founded: "1938",
    earlyHistory:
      "Mercury е създадена от Edsel Ford като средна марка между Ford и Lincoln. Първият модел е Mercury Eight (1939). В началото Mercury произвежда стилни, по-мощни версии на Ford платформи.",
    classicEra: "Mercury Cougar, Marauder, Comet. Cougar е muscle/luxury икона.",
    heritage: "Закрита 2011.",
    models: ["Eight", "Cougar", "Marauder", "Comet", "Grand Marquis"],
  },
  {
    make: "Plymouth",
    aliases: ["плимут", "Плимут"],
    country: "САЩ",
    founded: "1928",
    earlyHistory:
      "Plymouth е създадена от Chrysler като достъпна марка. Първият модел е Model Q (1928). В началото Plymouth произвежда надеждни масови автомобили, конкуриращи Ford и Chevrolet.",
    classicEra: "Plymouth Barracuda, 'Cuda, Road Runner, GTX, Duster. Barracuda е пионер на pony car сегмента.",
    heritage: "Закрита 2001. Muscle car икона.",
    models: ["Barracuda", "'Cuda", "Road Runner", "GTX", "Duster", "Fury"],
  },
  {
    make: "Studebaker",
    aliases: ["стъдибейкър", "Стъдибейкър"],
    country: "САЩ",
    founded: "1852 (автомобили от 1902)",
    earlyHistory:
      "Studebaker започва с фурми и карети. Първият автомобил е 1902. В началото Studebaker произвежда качествени независими автомобили — един от малкото производители, оцелял през Great Depression.",
    classicEra: "Studebaker Avanti, Commander, Hawk, Lark. Avanti е футуристичен дизайн от 1962.",
    heritage: "Закрита 1966. Силна колекционерска стойност.",
    models: ["Avanti", "Commander", "Hawk", "Lark", "Champion"],
  },
  {
    make: "Packard",
    aliases: ["пакард", "Пакард"],
    country: "САЩ",
    founded: "1899",
    earlyHistory:
      "Packard е луксозен производител от Детройт. Първият модел е Model A (1899). В началото Packard произвежда най-престижните американски автомобили — конкурент на Rolls-Royce в САЩ.",
    classicEra: "Packard Twelve, Caribbean, Clipper. Златната ера на американския лукс.",
    heritage: "Закрита 1958. Икона на pre-war и post-war лукс.",
    models: ["Twelve", "Caribbean", "Clipper", "Patrician", "Super Eight"],
  },
  {
    make: "AMC",
    aliases: ["амс", "АМС", "american motors", "amc"],
    country: "САЩ",
    founded: "1954",
    earlyHistory:
      "American Motors Corporation се сформира от сливане на Nash и Hudson. В началото AMC произвежда компактни, икономични автомобили — Rambler. Стратегия: алтернатива на Big Three.",
    classicEra: "AMC Gremlin, Pacer, Javelin, AMX, Eagle. Pacer е култов неортодоксен дизайн.",
    heritage: "Погълната от Chrysler (1987). Jeep наследява част от AMC.",
    models: ["Rambler", "Gremlin", "Pacer", "Javelin", "AMX", "Eagle", "Matador"],
  },
  {
    make: "Hummer",
    aliases: ["хамър", "Хамър", "hummer"],
    country: "САЩ",
    founded: "1992 (граждански H1)",
    earlyHistory:
      "Hummer H1 е гражданска версия на военния HMMWV (Humvee). AM General произвежда H1 от 1992. В началото Hummer произвежда екстремни, огромни офроуд SUV с военен дизайн.",
    classicEra: "Hummer H1, H2, H3. Символ на 90-те и 2000-те excess култура.",
    heritage: "Закрита, рестартирана като GMC Hummer EV.",
    models: ["H1", "H2", "H3"],
  },
  {
    make: "Ram",
    aliases: ["рам", "Рам", "dodge ram"],
    country: "САЩ",
    founded: "2010 (като марка), Dodge Ram по-рано",
    earlyHistory:
      "Ram пикапите произхождат от Dodge D Series (1961). Dodge Ram (1981) установява името. В началото Ram произвежда здрави работни пикапи за американския пазар.",
    classicEra: "Dodge Ram, Power Wagon, Cummins diesel версии. Доминация в пикап сегмента.",
    heritage: "Отделна марка в Stellantis.",
    models: ["1500", "2500", "3500", "Power Wagon", "ProMaster"],
  },
  {
    make: "Nash",
    aliases: ["наш", "Наш"],
    country: "САЩ",
    founded: "1916",
    earlyHistory:
      "Nash Motors е основана от Charles Nash (бивш GM президент). Първият модел е Nash Six (1918). В началото Nash произвежда иновативни средни автомобили — първи масов unibody конструкция (1941 Airflyte).",
    classicEra: "Nash Metropolitan, Rambler, Ambassador. Metropolitan е микроколaboration с Austin.",
    heritage: "Слята в AMC.",
    models: ["Six", "Ambassador", "Metropolitan", "Rambler"],
  },
  {
    make: "Hudson",
    aliases: ["хъдсън", "Хъдсън"],
    country: "САЩ",
    founded: "1909",
    earlyHistory:
      "Hudson Motor Car Company е основана в Детройт. Първият модел е Model 20 (1909). В началото Hudson произвежда качествени средни автомобили. Hornet (1951) доминира в NASCAR с Step-Down дизайн.",
    classicEra: "Hudson Hornet, Commodore, Wasp. Hornet е NASCAR легенда.",
    heritage: "Слята в AMC (1954).",
    models: ["Hornet", "Commodore", "Wasp", "Super Six"],
  },
  {
    make: "Willys",
    aliases: ["уилис", "Уилис", "willys-overland"],
    country: "САЩ",
    founded: "1908",
    earlyHistory:
      "Willys-Overland е сред най-големите производители в 20-те. По време на WWII Willys произвежда MB Jeep за армията. В началото на гражданския пазар — Willys CJ (Civilian Jeep).",
    classicEra: "Willys MB, CJ-2A, CJ-3A, Jeepster. Корен на Jeep марката.",
    heritage: "Jeep наследява Willys офроуд ДНК.",
    models: ["MB", "CJ-2A", "CJ-3A", "Jeepster", "Aero"],
  },

  // ─── АЗИЯ ДОПЪЛНИТЕЛНО ───
  {
    make: "Lexus",
    aliases: ["лексус", "Лексус"],
    country: "Япония",
    founded: "1989",
    earlyHistory:
      "Lexus е премиум марката на Toyota, лансирана 1989 с LS 400. В началото Lexus произвежда луксозни седани с фокус върху тишина, качество и обслужване — директен удар срещу Mercedes и BMW.",
    classicEra: "Lexus LS, IS, GS, LFA. LFA V10 е суперкар шедьовър.",
    heritage: "Глобален премиум играч.",
    models: ["LS", "IS", "GS", "RX", "LFA", "LC", "NX"],
  },
  {
    make: "Infiniti",
    aliases: ["инфинити", "Инфинити"],
    country: "Япония",
    founded: "1989",
    earlyHistory:
      "Infiniti е луксозният бранд на Nissan (1989), конкурент на Lexus и Acura. Първият модел е Q45. В началото Infiniti произвежда мощни луксозни седани за САЩ.",
    classicEra: "Infiniti Q45, G35, FX, VQ двигатели. G35 е спортен седан хит.",
    heritage: "Премиум марка на Nissan.",
    models: ["Q45", "G35", "G37", "FX", "QX", "Q50", "Q60"],
  },
  {
    make: "Acura",
    aliases: ["акура", "Акура"],
    country: "Япония",
    founded: "1986",
    earlyHistory:
      "Acura е първата японска луксозна марка (1986) на Honda. Legend и Integra са първите модели. В началото Acura произвежда премиум Honda автомобили за САЩ.",
    classicEra: "Acura NSX (1990), Integra Type R, Legend. NSX е „everyday supercar“.",
    heritage: "Премиум марка на Honda.",
    models: ["NSX", "Integra", "Legend", "TLX", "MDX", "RSX"],
  },
  {
    make: "Isuzu",
    aliases: ["исузу", "Исузу"],
    country: "Япония",
    founded: "1916",
    earlyHistory:
      "Isuzu произхожда от Tokyo Ishikawajima Shipbuilding. Първият автомобил е A9 (1922). В началото Isuzu произвежда тежкотоварни и дизелови автомобили, после пикапи и SUV.",
    classicEra: "Isuzu Trooper, Piazza, Gemini, D-Max. Trooper е глобален SUV.",
    heritage: "Специалист по дизелови двигатели и пикапи.",
    models: ["Trooper", "Piazza", "Gemini", "D-Max", "Rodeo", "MU"],
  },
  {
    make: "Daihatsu",
    aliases: ["дайхатсу", "Дайхатсу"],
    country: "Япония",
    founded: "1907",
    earlyHistory:
      "Daihatsu е най-старият японски производител на автомобили. Първият модел е HA (1930). В началото Daihatsu произвежда кей кари (kei cars) и малки автомобили за Япония.",
    classicEra: "Daihatsu Charade, Terios, Copen. Kei car специалист.",
    heritage: "Част от Toyota Group.",
    models: ["Charade", "Terios", "Copen", "Mira", "Move"],
  },
  {
    make: "Genesis",
    aliases: ["генезис", "Генезис"],
    country: "Южна Корея",
    founded: "2015",
    earlyHistory:
      "Genesis е луксозният бранд на Hyundai (2015). Първият модел е G90. В началото Genesis произвежда премиум седани с дълга гаранция и високо качество на достъпна цена.",
    classicEra: "Genesis G90, G80, GV70, GV80. Бързо установена премиум марка.",
    heritage: "Корейски отговор на Mercedes и BMW.",
    models: ["G90", "G80", "G70", "GV70", "GV80", "GV60"],
  },
  {
    make: "Daewoo",
    aliases: ["даево", "Даево", "dae woo"],
    country: "Южна Корея",
    founded: "1967",
    earlyHistory:
      "Daewoo Motor произвежда достъпни масови автомобили. Matiz (1998) е градска икона. В началото Daewoo произвежда лицензни GM модели и собствени бюджетни коли за глобален износ.",
    classicEra: "Daewoo Matiz, Lanos, Nubira, Leganza. Matiz е разпространен в България.",
    heritage: "Погълната от GM, после закрита. Matiz остава на пазара под Chevrolet.",
    models: ["Matiz", "Lanos", "Nubira", "Leganza", "Espero", "Tico"],
  },
  {
    make: "BYD",
    aliases: ["бивайди", "БИД", "byd"],
    country: "Китай",
    founded: "1995 (автомобили от 2003)",
    earlyHistory:
      "BYD започва с батерии и електроника. Първите автомобили са бензинови (2003), после агресивен фокус върху EV. В началото BYD произвежда достъпни електрически и хибридни автомобили за китайския пазар.",
    classicEra: "BYD Tang, Han, Seal, Atto 3. Глобален лидер в EV продажби.",
    heritage: "Един от най-големите EV производители в света.",
    models: ["Han", "Tang", "Seal", "Atto 3", "Dolphin", "Song"],
  },
  {
    make: "Geely",
    aliases: ["джили", "Джили", "geely"],
    country: "Китай",
    founded: "1986",
    earlyHistory:
      "Geely започва с хладилници, после автомобили (1997). Първоначално произвежда достъпни китайски седани. В началото Geely произвежда бюджетни автомобили за вътрешния пазар.",
    classicEra: "Geely CK, Emgrand, Volvo acquisition (2010), Polestar, Lotus. Глобална експанзия.",
    heritage: "Собственик на Volvo Cars, Lotus, Polestar.",
    models: ["Emgrand", "Coolray", "Atlas", "Geometry"],
  },
  {
    make: "Great Wall",
    aliases: ["грейт уол", "Great Wall", "GWM", "gwm"],
    country: "Китай",
    founded: "1984",
    earlyHistory:
      "Great Wall (GWM) започва с пикапи и SUV. Първият модел Deer (1996) е пикап. В началото Great Wall произвежда утилитарни автомобили за китайския пазар.",
    classicEra: "Great Wall Hover, Wingle, Haval (подбранд). Haval става премиум SUV линия.",
    heritage: "GWM — глобален SUV и пикап играч.",
    models: ["Hover", "Wingle", "Haval H6", "Poer", "Ora"],
  },
  {
    make: "Chery",
    aliases: ["чери", "Чери"],
    country: "Китай",
    founded: "1997",
    earlyHistory:
      "Chery е основана в Уху, Анхуи. Първият модел е QQ (2003) — компактна градска кола. В началото Chery произвежда достъпни автомобили и двигатели с фокус върху износ.",
    classicEra: "Chery QQ, Tiggo SUV серия. Един от първите китайски износни брандове.",
    heritage: "Глобален бюджетен производител.",
    models: ["QQ", "Tiggo", "Arrizo", "Exeed"],
  },
  {
    make: "Holden",
    aliases: ["холдън", "Холдън"],
    country: "Австралия",
    founded: "1856 (автомобили от 1908)",
    earlyHistory:
      "Holden започва с конски седла, после автомобилни каросерии. Първият собствен модел е 48-215 (FX, 1948). В началото Holden произвежда „австралийския автомобил“ за местния пазар.",
    classicEra: "Holden Commodore, Ute, Monaro. Commodore е национална икона.",
    heritage: "Закрита 2020. Символ на австралийската автомобилна индустрия.",
    models: ["Commodore", "Ute", "Monaro", "Torana", "Kingswood"],
  },
  {
    make: "Koenigsegg",
    aliases: ["кенигсег", "Кьонигсег", "koenigsegg"],
    country: "Швеция",
    founded: "1994",
    earlyHistory:
      "Christian von Koenigsegg основава компанията в Ängelholm. Първият модел CC8S (2002) е ръчно изработен хиперкар. В началото Koenigsegg произвежда екстремни малосерийни суперавтомобили.",
    classicEra: "Koenigsegg CCX, Agera, Regera, Jesko. Рекорди за скорост и иновации.",
    heritage: "Нишов шведски хиперкар производител.",
    models: ["CC8S", "CCX", "Agera", "Regera", "Jesko", "Gemera"],
  },
  {
    make: "Rimac",
    aliases: ["римак", "Римак"],
    country: "Хърватия",
    founded: "2009",
    earlyHistory:
      "Mate Rimac основава Rimac в Гараж в Хърватия. Concept_One (2013) е първият хърватски електрически хиперкар. В началото Rimac произвежда EV технологии и екстремни хиперкари.",
    classicEra: "Rimac Concept_One, Nevera. Nevera е сред най-бързите EV.",
    heritage: "Контролира Bugatti Rimac joint venture. EV tech лидер.",
    models: ["Concept_One", "Nevera"],
  },
  {
    make: "Simca",
    aliases: ["симка", "Симка"],
    country: "Франция",
    founded: "1934",
    earlyHistory:
      "Simca (Société Industrielle de Mécanique et Carrosserie Automobile) е основана с италиански корени (Fiat). Първият модел е Simca-Fiat 6 CV. В началото Simca произвежда достъпни малки автомобили за френския пазар.",
    classicEra: "Simca 1000, 1100, 1301, Horizon. Популярни семейни коли във Франция.",
    heritage: "Погълната от Chrysler Europe, после Peugeot.",
    models: ["1000", "1100", "1301", "Horizon", "Aronde"],
  },
  {
    make: "Talbot",
    aliases: ["талбот", "Талбот"],
    country: "Франция/Великобритания",
    founded: "1903 (оригинал), 1978 (рестарт)",
    earlyHistory:
      "Talbot има сложна история с британски и френски корени. Рестартираната марка (1978) произвежда модели на база Simca/Chrysler. В началото Talbot произвежда средни семейни автомобили за Европа.",
    classicEra: "Talbot Horizon, Alpine, Solara, Tagora. Кратък живот, но разпространен в Европа.",
    heritage: "Закрита 1994.",
    models: ["Horizon", "Alpine", "Solara", "Tagora", "Samba"],
  },
  {
    make: "Autobianchi",
    aliases: ["аутобианки", "Аутобианки"],
    country: "Италия",
    founded: "1955",
    earlyHistory:
      "Autobianchi е съвместно предприятие между Bianchi, Fiat и Pirelli. Първият модел е Bianchina (1957) — луксозна версия на Fiat 500. В началото Autobianchi произвежда премиум малки коли.",
    classicEra: "Autobianchi A112, Y10. A112 е популярна малка кола в Италия.",
    heritage: "Слята в Lancia/Fiat.",
    models: ["Bianchina", "A112", "Y10", "Primula"],
  },
];
