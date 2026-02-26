export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "kako-digitalizirati-evidenciju-radnog-vremena",
        title: "Kako digitalizirati evidenciju radnog vremena u građevini",
        excerpt: "Papir i Excel su prošlost. Saznajte kako moderna digitalna evidencija štedi sate, smanjuje greške i poboljšava compliance.",
        date: "2026-02-18",
        readTime: "6 min",
        category: "Digitalizacija",
        content: `## Zašto papir više ne radi

Građevinska industrija je dugo oslanjala na papirnate tablice i Excel za evidenciju radnog vremena. Ali s rastom ekipa, projekata i regulatornih zahtjeva, ručni pristup više nije održiv.

### Problemi ručne evidencije

- **Greške u unosu** — ručno prepisivanje podataka rezultira 15-20% grešaka
- **Kašnjenje** — podaci stižu s zakašnjenjem od dana ili čak tjedana  
- **Nema real-time uvida** — ne znate tko je gdje dok se ne javi
- **Compliance rizik** — papirni tragovi teško prolaze inspekcije

## Digitalno rješenje

Moderna platforma poput Vi-Di-Sef omogućuje:

1. **QR check-in** na gradilištu — radnik skenira kod na ulasku
2. **GPS verifikacija** — automatska potvrda lokacije
3. **PIN pristup** na mobitelu — svaki radnik ima svoj pristup
4. **Automatski izvještaji** — PDF i Excel jednim klikom

## ROI digitalizacije

Tvrtke koje su prešle na digitalnu evidenciju izvještavaju:
- **75% manje vremena** potrošenog na administraciju
- **98% točnost** podataka
- **0 problema** s inspekcijama

> Digitalizacija nije trošak — to je investicija koja se vraća u prvom mjesecu.`,
    },
    {
        slug: "zasto-excel-ne-radi-za-evidenciju-sati",
        title: "5 razloga zašto Excel ne radi za evidenciju sati",
        excerpt: "Excel je sjajan alat, ali za evidenciju radnog vremena građevinskih radnika — to je kao koristiti čekić za vijke.",
        date: "2026-02-15",
        readTime: "5 min",
        category: "Produktivnost",
        content: `## 1. Nema verzioniranja u realnom vremenu

Kad pet osoba uređuje isti Excel, kaos je neizbježan. Tko je zadnji spremio? Koja verzija je točna? S dedikiranom platformom, jedan izvor istine — uvijek.

## 2. Ručni unos = greške

Svaki ručni unos je prilika za grešku. Krivi datum, krivi projekt, krivi radnik. Automatska evidencija eliminira ljudski faktor.

## 3. Nema mobilnog pristupa

Radnici na gradilištu nemaju laptop. Trebaju mobitel, QR kod i 5 sekundi. Excel to ne može ponuditi.

## 4. Izvještaji su noćna mora

Pivot tablice, formule, makroi — sve to zahtijeva stručnost. Moderna platforma generira izvještaje jednim klikom.

## 5. Compliance problemi

Inspekcija traži evidenciju po danima, projektima i radnicima. U Excelu — sati kopanja. U Vi-Di-Sef-u — 3 klika do PDF-a.

> Prebacite se na alat koji je napravljen za evidenciju — ne za tablice.`,
    },
    {
        slug: "gps-pracenje-radnika",
        title: "GPS praćenje radnika — prednosti i implementacija",
        excerpt: "Kako GPS tehnologija pomaže građevinskim tvrtkama da optimiziraju rasporede, smanje troškove i poboljšaju sigurnost.",
        date: "2026-02-12",
        readTime: "7 min",
        category: "Tehnologija",
        content: `## Što je GPS praćenje radnika?

GPS praćenje u kontekstu upravljanja radnom snagom koristi lokacijske podatke za verificiranje prisutnosti radnika na gradilištu, optimiziranje rasporeda i poboljšanje sigurnosti.

## Ključne prednosti

### 1. Automatska verifikacija prisutnosti
Kad radnik stigne na gradilište, sustav automatski bilježi dolazak. Nema mogućnosti lažiranja — GPS ne laže.

### 2. Optimizacija rasporeda
Vidite u realnom vremenu tko je gdje. Ako trebate premjestiti ekipu na drugi projekt, znate tko je najbliži.

### 3. Poboljšana sigurnost
U slučaju nesreće, odmah znate tko je na lokaciji. Kritično za emergency response.

### 4. Transparentnost prema klijentima
Dokazujete prisutnost ekipe na projektu s GPS logovima — bez rasprava.

## Implementacija u 3 koraka

1. **Instaliraj Vi-Di-Sef** — svaki radnik dobije pristup na mobitelu
2. **Definiraj gradilišta** — unesite lokacije projekata
3. **Aktiviraj GPS** — sustav automatski prati dolazak/odlazak

## Privatnost i zakonska usklađenost

Vi-Di-Sef prati lokaciju samo tijekom radnog vremena i u skladu s GDPR regulativama. Radnici imaju uvid u svoje podatke.`,
    },
    {
        slug: "gradevinski-dnevnik-po-zakonu",
        title: "Građevinski dnevnik po zakonu — što mora sadržavati",
        excerpt: "Kompletan vodič o zakonskim zahtjevima za građevinski dnevnik u Hrvatskoj, s praktičnim savjetima za digitalnu implementaciju.",
        date: "2026-02-08",
        readTime: "8 min",
        category: "Zakonodavstvo",
        content: `## Zakonska osnova

Prema Zakonu o gradnji (NN 153/13, 20/17, 39/19, 125/19), građevinski dnevnik je obvezan dokument za sve građevine za koje je izdana građevinska dozvola.

## Obavezni sadržaj

### Dnevni zapisi moraju uključivati:
- Datum i vremenske uvjete
- Broj i kvalifikacije radnika na gradilištu
- Opis izvedenih radova
- Ugrađene materijale i opremu
- Rezultate ispitivanja
- Posjete nadzornog inženjera
- Posebne okolnosti i zastoje

## Čuvanje i pristup

Dnevnik se mora čuvati **tijekom trajanja građevine** i biti dostupan na uvid inspekciji.

## Digitalni vs. papirnati

Zakon dopušta digitalni oblik dnevnika, što donosi prednosti:
- **Automatsko bilježenje** datuma i vremena
- **Fotografska dokumentacija** — slike s gradilišta
- **GPS verifikacija** lokacije
- **Elektronski potpisi**
- **Jednostavno pretraživanje** i filtriranje

## Vi-Di-Sef rješenje

Naš modul za građevinski dnevnik automatizira većinu unosa i osigurava da sve zakonske zahtjeve ispunite bez dodatnog napora.`,
    },
    {
        slug: "kako-smanjiti-administraciju",
        title: "Kako smanjiti administraciju za 75%",
        excerpt: "Praktični koraci za automatizaciju administrativnih procesa u građevinskim tvrtkama — od evidencije do izvještaja.",
        date: "2026-02-05",
        readTime: "6 min",
        category: "Upravljanje",
        content: `## Koliko vremena trošite na administraciju?

Prosječna građevinska tvrtka s 20+ radnika troši **40+ sati mjesečno** na administrativne zadatke: evidencija sati, obračun plaća, izvještaji za klijente, compliance dokumentacija.

## Automatizacija u 5 koraka

### 1. Digitalna evidencija radnog vremena
Zamijenite papir i Excel s automatskim QR check-in sustavom. **Ušteda: 15 sati/mj**

### 2. Automatski izvještaji
Umjesto ručnog kreiranja, generirajte PDF i Excel izvještaje jednim klikom. **Ušteda: 8 sati/mj**

### 3. Digitalne otpremnice
Elektronski potpis, automatsko arhiviranje, instant dostava. **Ušteda: 5 sati/mj**

### 4. Obračun na temelju podataka
AI analizira radne sate i automatski računa naknade. **Ušteda: 6 sati/mj**

### 5. Centralizirano upravljanje projektima
Sve na jednom mjestu — bez prebacivanja između alata. **Ušteda: 6 sati/mj**

## Ukupna ušteda: 40 sati → 10 sati

To je **75% manje administracije** — i 30 sati mjesečno za produktivan rad.

> S Vi-Di-Sef platformom, administracija postaje background proces, ne vaš main job.`,
    },
];
