/*
    =====================================================
    WORDIE TALKIE — vocabulary.js
    Data kosakata (dipakai halaman Vocabulary & Flashcard)

    Letakkan di ROOT (sejajar script.js & template.html).

    Format tiap kata di VOCAB_SETS:
        { hanzi: "...", pinyin: "...", meaning: "arti Indonesia kasual", note: "catatan (opsional)" }

    Cara nambah kata baru: tinggal tambah baris { hanzi, pinyin, meaning } baru di
    set yang sesuai, atau bikin set baru (array baru) di bawah.

    Hasil akhirnya tersedia di:
        window.VOCAB       -> array objek:
                              { id, set, hanzi, pinyin, meaning, note }
        window.VOCAB_UTIL  -> fungsi bantu (normalize, search, shuffle)
    =====================================================
*/

(function () {

    "use strict";


    var VOCAB_SETS = [

        /* ---------- Set 1 ---------- */
        [
            { hanzi: "國家公園", pinyin: "guójiā gōngyuán", meaning: "taman nasional" },
            { hanzi: "去吃大餐", pinyin: "qù chī dàcān", meaning: "pergi makan enak-enakan" },
            { hanzi: "美味餐廳", pinyin: "měiwèi cāntīng", meaning: "restoran yang enak" },
            { hanzi: "休息室", pinyin: "xiūxíshì", meaning: "ruang istirahat" },
            { hanzi: "天氣預報", pinyin: "tiānqì yùbào", meaning: "prakiraan cuaca" },
            { hanzi: "一件", pinyin: "yí jiàn", meaning: "satu potong (kata bantu baju)" },
            { hanzi: "一盒", pinyin: "yì hé", meaning: "satu kotak" },
            { hanzi: "上網", pinyin: "shàngwǎng", meaning: "online / internetan" },
            { hanzi: "商店", pinyin: "shāngdiàn", meaning: "toko" },
            { hanzi: "背包", pinyin: "bēibāo", meaning: "tas ransel" },
            { hanzi: "眼鏡", pinyin: "yǎnjìng", meaning: "kacamata" },
            { hanzi: "紅燒魚", pinyin: "hóngshāo yú", meaning: "ikan masak kecap (ala Tiongkok)" },
            { hanzi: "豆腐", pinyin: "dòufu", meaning: "tahu" },
            { hanzi: "青菜", pinyin: "qīngcài", meaning: "sayur hijau" },
            { hanzi: "炸", pinyin: "zhà", meaning: "goreng (banyak minyak)" },
            { hanzi: "炒", pinyin: "chǎo", meaning: "tumis" },
            { hanzi: "一碗", pinyin: "yì wǎn", meaning: "semangkuk" },
            { hanzi: "一盤", pinyin: "yì pán", meaning: "sepiring" },
            { hanzi: "一瓶", pinyin: "yì píng", meaning: "sebotol" },
            { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bir" },
            { hanzi: "豆沙包", pinyin: "dòushābāo", meaning: "bakpao isi kacang merah" },
            { hanzi: "中號", pinyin: "zhōnghào", meaning: "ukuran M" },
            { hanzi: "試", pinyin: "shì", meaning: "coba" },
            { hanzi: "襯衫", pinyin: "chènshān", meaning: "kemeja" },
            { hanzi: "歡迎再來", pinyin: "huānyíng zài lái", meaning: "silakan datang lagi" },
            { hanzi: "南區", pinyin: "nánqū", meaning: "wilayah selatan" },
            { hanzi: "東區", pinyin: "dōngqū", meaning: "wilayah timur" },
            { hanzi: "社區", pinyin: "shèqū", meaning: "lingkungan / kompleks perumahan" },
            { hanzi: "點心", pinyin: "diǎnxīn", meaning: "cemilan / dimsum" },
            { hanzi: "冰淇淋", pinyin: "bīngqílín", meaning: "es krim" },
            { hanzi: "畢業論文", pinyin: "bìyè lùnwén", meaning: "skripsi" },
            { hanzi: "計畫", pinyin: "jìhuà", meaning: "rencana" },
            { hanzi: "休假", pinyin: "xiūjià", meaning: "ambil cuti" },
            { hanzi: "出國", pinyin: "chūguó", meaning: "pergi ke luar negeri" },
            { hanzi: "旅行", pinyin: "lǚxíng", meaning: "bepergian / jalan-jalan" },
            { hanzi: "假期", pinyin: "jiàqí", meaning: "masa liburan" },
            { hanzi: "學期", pinyin: "xuéqī", meaning: "semester" },
            { hanzi: "度假", pinyin: "dùjià", meaning: "liburan" },
            { hanzi: "貿易公司", pinyin: "màoyì gōngsī", meaning: "perusahaan dagang" },
            { hanzi: "興趣", pinyin: "xìngqù", meaning: "minat / hobi" },
            { hanzi: "照相", pinyin: "zhàoxiàng", meaning: "foto-foto / memotret" },
            { hanzi: "收集", pinyin: "shōují", meaning: "mengoleksi" },
            { hanzi: "照片", pinyin: "zhàopiàn", meaning: "foto" },
            { hanzi: "敲門", pinyin: "qiāomén", meaning: "ngetuk pintu" }
        ],

        /* ---------- Set 2 ---------- */
        [
            { hanzi: "輕鬆", pinyin: "qīngsōng", meaning: "santai / rileks" },
            { hanzi: "船", pinyin: "chuán", meaning: "kapal / perahu" },
            { hanzi: "潛水", pinyin: "qiánshuǐ", meaning: "menyelam" },
            { hanzi: "各種", pinyin: "gèzhǒng", meaning: "berbagai macam" },
            { hanzi: "教練", pinyin: "jiàoliàn", meaning: "pelatih (coach)" },
            { hanzi: "晒太陽", pinyin: "shài tàiyáng", meaning: "berjemur" },
            { hanzi: "風景", pinyin: "fēngjǐng", meaning: "pemandangan" },
            { hanzi: "心情", pinyin: "xīnqíng", meaning: "suasana hati (mood)" },
            { hanzi: "起來", pinyin: "qǐlái", meaning: "partikel arah: mulai... / kesannya kalau dilihat/dirasa...", note: "Dipakai sebagai pola tata bahasa, mis. 聞起來 = kalau dicium" }
        ],

        /* ---------- Set 3 ---------- */
        [
            { hanzi: "感恩節", pinyin: "gǎn'ēnjié", meaning: "Thanksgiving" },
            { hanzi: "趕快", pinyin: "gǎnkuài", meaning: "cepetan" },
            { hanzi: "確定", pinyin: "quèdìng", meaning: "memastikan / yakin" },
            { hanzi: "熱鬧", pinyin: "rènao", meaning: "ramai / meriah" },
            { hanzi: "建議", pinyin: "jiànyì", meaning: "saran" },
            { hanzi: "火雞", pinyin: "huǒjī", meaning: "kalkun" },
            { hanzi: "馬鈴薯", pinyin: "mǎlíngshǔ", meaning: "kentang" },
            { hanzi: "馬鈴薯泥", pinyin: "mǎlíngshǔ ní", meaning: "kentang tumbuk" },
            { hanzi: "沙拉", pinyin: "shālā", meaning: "salad" },
            { hanzi: "甜點", pinyin: "tiándiǎn", meaning: "makanan penutup / dessert" }
        ],

        /* ---------- Set 4 ---------- */
        [
            { hanzi: "派", pinyin: "pài", meaning: "kirim orang (mengutus)" },
            { hanzi: "分公司", pinyin: "fēn gōngsī", meaning: "kantor cabang" },
            { hanzi: "科技", pinyin: "kējì", meaning: "teknologi" },
            { hanzi: "情形", pinyin: "qíngxíng", meaning: "keadaan / situasi", note: "Sama artinya dengan 情況" },
            { hanzi: "至少", pinyin: "zhìshǎo", meaning: "setidaknya" },
            { hanzi: "甚至", pinyin: "shènzhì", meaning: "bahkan" },
            { hanzi: "方面", pinyin: "fāngmiàn", meaning: "sisi / aspek" },
            { hanzi: "發展", pinyin: "fāzhǎn", meaning: "berkembang" },
            { hanzi: "相當", pinyin: "xiāngdāng", meaning: "lumayan / cukup" },
            { hanzi: "產品", pinyin: "chǎnpǐn", meaning: "produk" },
            { hanzi: "經驗", pinyin: "jīngyàn", meaning: "pengalaman" },
            { hanzi: "幫助", pinyin: "bāngzhù", meaning: "bantuan / membantu" }
        ],

        /* ---------- Set 5 ---------- */
        [
            { hanzi: "聞起來", pinyin: "wén qǐlái", meaning: "baunya / kalau dicium" },
            { hanzi: "味道", pinyin: "wèidào", meaning: "rasa / bau" },
            { hanzi: "濃", pinyin: "nóng", meaning: "pekat / kental" },
            { hanzi: "淡", pinyin: "dàn", meaning: "encer / hambar" },
            { hanzi: "泡", pinyin: "pào", meaning: "seduh / rendam" },
            { hanzi: "有趣", pinyin: "yǒuqù", meaning: "menarik / seru" },
            { hanzi: "品質", pinyin: "pǐnzhì", meaning: "kualitas" },
            { hanzi: "要是", pinyin: "yàoshi", meaning: "kalau", note: "Sama artinya dengan 如果" },
            { hanzi: "東方美人茶", pinyin: "Dōngfāng Měirén chá", meaning: "teh Oriental Beauty" }
        ],

        /* ---------- Set 6 ---------- */
        [
            { hanzi: "一切", pinyin: "yíqiè", meaning: "semuanya" },
            { hanzi: "適應了", pinyin: "shìyìng le", meaning: "sudah terbiasa / sudah beradaptasi" },
            { hanzi: "壓力", pinyin: "yālì", meaning: "tekanan / stres" },
            { hanzi: "熱心", pinyin: "rèxīn", meaning: "antusias / baik hati" },
            { hanzi: "願意", pinyin: "yuànyì", meaning: "bersedia / mau" },
            { hanzi: "資料", pinyin: "zīliào", meaning: "data / materi" },
            { hanzi: "解決", pinyin: "jiějué", meaning: "menyelesaikan" },
            { hanzi: "拒絕", pinyin: "jùjué", meaning: "menolak" },
            { hanzi: "部門", pinyin: "bùmén", meaning: "departemen" },
            { hanzi: "活潑", pinyin: "huópō", meaning: "ceria / lincah" },
            { hanzi: "親切", pinyin: "qīnqiè", meaning: "ramah" },
            { hanzi: "相處", pinyin: "xiāngchǔ", meaning: "bergaul" },
            { hanzi: "滿意", pinyin: "mǎnyì", meaning: "puas" },
            { hanzi: "環境", pinyin: "huánjìng", meaning: "lingkungan" },
            { hanzi: "互相", pinyin: "hùxiāng", meaning: "satu sama lain" },
            { hanzi: "好處", pinyin: "hǎochù", meaning: "manfaat" }
        ],

        /* ---------- Set 7 ---------- */
        [
            { hanzi: "出差", pinyin: "chūchāi", meaning: "dinas luar / business trip" },
            { hanzi: "親戚", pinyin: "qīnqi", meaning: "saudara / kerabat" },
            { hanzi: "談", pinyin: "tán", meaning: "ngobrol / membahas" },
            { hanzi: "合作", pinyin: "hézuò", meaning: "kerja sama" },
            { hanzi: "投資", pinyin: "tóuzī", meaning: "investasi" },
            { hanzi: "溝通", pinyin: "gōutōng", meaning: "komunikasi" },
            { hanzi: "表妹", pinyin: "biǎomèi", meaning: "sepupu perempuan (lebih muda)" },
            { hanzi: "大城市", pinyin: "dàchéngshì", meaning: "kota besar" },
            { hanzi: "交通", pinyin: "jiāotōng", meaning: "lalu lintas / transportasi" }
        ],

        /* ---------- Set 8 ---------- */
        [
            { hanzi: "被", pinyin: "bèi", meaning: "di- (kalimat pasif)" },
            { hanzi: "經理", pinyin: "jīnglǐ", meaning: "manajer" },
            { hanzi: "罵", pinyin: "mà", meaning: "memarahi" },
            { hanzi: "合約", pinyin: "héyuē", meaning: "kontrak" },
            { hanzi: "價錢", pinyin: "jiàqián", meaning: "harga" },
            { hanzi: "嚴重", pinyin: "yánzhòng", meaning: "parah / serius" },
            { hanzi: "罵了我一頓", pinyin: "mà le wǒ yí dùn", meaning: "memarahi aku habis-habisan" },
            { hanzi: "一頓", pinyin: "yí dùn", meaning: "sekali (dimarahi / makan) sepuasnya" },
            { hanzi: "交給", pinyin: "jiāo gěi", meaning: "menyerahkan ke" },
            { hanzi: "檔案", pinyin: "dàng'àn", meaning: "dokumen / file" },
            { hanzi: "檢查", pinyin: "jiǎnchá", meaning: "memeriksa" },
            { hanzi: "每份資料", pinyin: "měi fèn zīliào", meaning: "setiap dokumen / data" }
        ],

        /* ---------- Set 9 ---------- */
        [
            { hanzi: "書房", pinyin: "shūfáng", meaning: "ruang baca / ruang kerja" },
            { hanzi: "紐約", pinyin: "Niǔyuē", meaning: "New York" },
            { hanzi: "割草", pinyin: "gē cǎo", meaning: "potong rumput" },
            { hanzi: "院子", pinyin: "yuànzi", meaning: "halaman rumah" },
            { hanzi: "安排", pinyin: "ānpái", meaning: "mengatur / menjadwalkan" }
        ],

        /* ---------- Set 10 ---------- */
        [
            { hanzi: "考卷", pinyin: "kǎojuàn", meaning: "lembar ujian" },
            { hanzi: "仔細", pinyin: "zǐxì", meaning: "teliti" },
            { hanzi: "用功", pinyin: "yònggōng", meaning: "rajin belajar" },
            { hanzi: "漢字", pinyin: "hànzì", meaning: "huruf Han / hanzi" },
            { hanzi: "句子", pinyin: "jùzi", meaning: "kalimat" },
            { hanzi: "聲調", pinyin: "shēngdiào", meaning: "nada" },
            { hanzi: "成績", pinyin: "chéngjì", meaning: "nilai / prestasi" },
            { hanzi: "同意", pinyin: "tóngyì", meaning: "setuju" },
            { hanzi: "主管", pinyin: "zhǔguǎn", meaning: "atasan / manajer" },
            { hanzi: "不但⋯而且", pinyin: "búdàn… érqiě", meaning: "bukan cuma… tapi juga" },
            { hanzi: "友善", pinyin: "yǒushàn", meaning: "ramah / bersahabat" },
            { hanzi: "把", pinyin: "bǎ", meaning: "pola kalimat: objek diapakan", note: "S + 把 + O + verb + tempat. Objeknya dibaca: bukunya diapakan. Contoh: 我把手機放在桌子上 = Aku taruh HP di atas meja" },
            { hanzi: "我把手機放在桌子上", pinyin: "wǒ bǎ shǒujī fàng zài zhuōzi shàng", meaning: "aku taruh HP di atas meja" }
        ],

        /* ---------- Set 11 (Buku 4) ---------- */
        [
            { hanzi: "消息", pinyin: "xiāoxi", meaning: "kabar / berita" },
            { hanzi: "終於", pinyin: "zhōngyú", meaning: "akhirnya" },
            { hanzi: "興奮", pinyin: "xīngfèn", meaning: "antusias / excited" },
            { hanzi: "打聽", pinyin: "dǎting", meaning: "cari info / nanya-nanya" },
            { hanzi: "替", pinyin: "tì", meaning: "mewakili / untuk" },
            { hanzi: "留下", pinyin: "liúxià", meaning: "meninggalkan / menyisakan" }
        ],

        /* ---------- Set 12 ---------- */
        [
            { hanzi: "所有", pinyin: "suǒyǒu", meaning: "semua" },
            { hanzi: "推車", pinyin: "tuīchē", meaning: "troli" },
            { hanzi: "時差", pinyin: "shíchā", meaning: "jetlag / beda waktu" },
            { hanzi: "渴", pinyin: "kě", meaning: "haus" },
            { hanzi: "瓶水", pinyin: "píng shuǐ", meaning: "sebotol air" },
            { hanzi: "塞車", pinyin: "sāichē", meaning: "macet" },
            { hanzi: "工具", pinyin: "gōngjù", meaning: "alat" },
            { hanzi: "訂好了", pinyin: "dìng hǎo le", meaning: "sudah dipesan / sudah reservasi" },
            { hanzi: "省", pinyin: "shěng", meaning: "hemat" },
            { hanzi: "細心", pinyin: "xìxīn", meaning: "teliti / cermat (sifat orang)" },
            { hanzi: "接待", pinyin: "jiēdài", meaning: "menyambut / menerima tamu" }
        ],

        /* ---------- Set 13 ---------- */
        [
            { hanzi: "雖然", pinyin: "suīrán", meaning: "meskipun" },
            { hanzi: "那棟大樓", pinyin: "nà dòng dàlóu", meaning: "gedung itu" },
            { hanzi: "舊", pinyin: "jiù", meaning: "lama / usang" },
            { hanzi: "公寓", pinyin: "gōngyù", meaning: "apartemen" },
            { hanzi: "整理", pinyin: "zhěnglǐ", meaning: "merapikan" },
            { hanzi: "電梯", pinyin: "diàntī", meaning: "lift" },
            { hanzi: "樓梯", pinyin: "lóutī", meaning: "tangga" },
            { hanzi: "巷子", pinyin: "xiàngzi", meaning: "gang" },
            { hanzi: "步", pinyin: "bù", meaning: "langkah" },
            { hanzi: "另外", pinyin: "lìngwài", meaning: "selain itu" },
            { hanzi: "再加上", pinyin: "zài jiāshàng", meaning: "ditambah lagi" },
            { hanzi: "電視", pinyin: "diànshì", meaning: "TV" },
            { hanzi: "冰箱", pinyin: "bīngxiāng", meaning: "kulkas" },
            { hanzi: "租金", pinyin: "zūjīn", meaning: "uang sewa / uang kos" },
            { hanzi: "萬", pinyin: "wàn", meaning: "sepuluh ribu" },
            { hanzi: "千", pinyin: "qiān", meaning: "seribu" },
            { hanzi: "包括", pinyin: "bāokuò", meaning: "termasuk" },
            { hanzi: "裝", pinyin: "zhuāng", meaning: "memasang / install" }
        ],

        /* ---------- Set 14 ---------- */
        [
            { hanzi: "豆漿", pinyin: "dòujiāng", meaning: "susu kedelai" },
            { hanzi: "蛋餅", pinyin: "dànbǐng", meaning: "dan bing (dadar gulung ala Taiwan)" },
            { hanzi: "豐富", pinyin: "fēngfù", meaning: "macam-macam / kaya" },
            { hanzi: "計程車", pinyin: "jìchéngchē", meaning: "taksi" },
            { hanzi: "路線", pinyin: "lùxiàn", meaning: "rute" },
            { hanzi: "班次", pinyin: "bāncì", meaning: "jadwal keberangkatan / shift kerja", note: "Bisa dipakai untuk nomor/jadwal bus, kereta, dll" },
            { hanzi: "危險", pinyin: "wēixiǎn", meaning: "bahaya" },
            { hanzi: "普遍", pinyin: "pǔbiàn", meaning: "umum" },
            { hanzi: "大部分", pinyin: "dàbùfen", meaning: "sebagian besar" }
        ],

        /* ---------- Set 15 ---------- */
        [
            { hanzi: "提到", pinyin: "tídào", meaning: "menyebut / menyinggung" },
            { hanzi: "準時", pinyin: "zhǔnshí", meaning: "tepat waktu" },
            { hanzi: "攤販", pinyin: "tānfàn", meaning: "pedagang kaki lima" },
            { hanzi: "吸引", pinyin: "xīyǐn", meaning: "menarik (daya tarik)" },
            { hanzi: "各式各樣", pinyin: "gèshì gèyàng", meaning: "berbagai macam" },
            { hanzi: "日用品", pinyin: "rìyòngpǐn", meaning: "barang kebutuhan sehari-hari" },
            { hanzi: "酥", pinyin: "sū", meaning: "renyah (berlapis-lapis)" },
            { hanzi: "脆", pinyin: "cuì", meaning: "garing" }
        ],

        /* ---------- Set 16 ---------- */
        [
            { hanzi: "特色", pinyin: "tèsè", meaning: "ciri khas" },
            { hanzi: "不管", pinyin: "bùguǎn", meaning: "terlepas dari / apa pun itu" },
            { hanzi: "首先", pinyin: "shǒuxiān", meaning: "pertama-tama" },
            { hanzi: "建築", pinyin: "jiànzhú", meaning: "bangunan / arsitektur" },
            { hanzi: "歷史", pinyin: "lìshǐ", meaning: "sejarah" },
            { hanzi: "關係", pinyin: "guānxi", meaning: "hubungan" },
            { hanzi: "傳統", pinyin: "chuántǒng", meaning: "tradisional" },
            { hanzi: "除了", pinyin: "chúle", meaning: "kecuali / selain" },
            { hanzi: "現代", pinyin: "xiàndài", meaning: "modern" },
            { hanzi: "幾乎", pinyin: "jīhū", meaning: "hampir" },
            { hanzi: "層", pinyin: "céng", meaning: "lantai / lapisan" },
            { hanzi: "五顏六色", pinyin: "wǔyán liùsè", meaning: "warna-warni" },
            { hanzi: "燈光", pinyin: "dēngguāng", meaning: "tata lampu" },
            { hanzi: "值得", pinyin: "zhíde", meaning: "pantas / layak" },
            { hanzi: "參觀", pinyin: "cānguān", meaning: "mengunjungi" },
            { hanzi: "博物館", pinyin: "bówùguǎn", meaning: "museum" },
            { hanzi: "寺廟", pinyin: "sìmiào", meaning: "kuil" },
            { hanzi: "欣賞", pinyin: "xīnshǎng", meaning: "mengagumi / menikmati keindahan" },
            { hanzi: "宗教信仰", pinyin: "zōngjiào xìnyǎng", meaning: "kepercayaan agama" },
            { hanzi: "現象", pinyin: "xiànxiàng", meaning: "fenomena / gejala" },
            { hanzi: "總是", pinyin: "zǒngshì", meaning: "selalu" },
            { hanzi: "居住", pinyin: "jūzhù", meaning: "tinggal (versi formal dari 住)" }
        ],

        /* ---------- Set 17 ---------- */
        [
            { hanzi: "迷", pinyin: "mí", meaning: "penggemar / fans" },
            { hanzi: "網球", pinyin: "wǎngqiú", meaning: "tenis" },
            { hanzi: "籃球", pinyin: "lánqiú", meaning: "basket" },
            { hanzi: "足球", pinyin: "zúqiú", meaning: "sepak bola" },
            { hanzi: "經過", pinyin: "jīngguò", meaning: "lewat" },
            { hanzi: "運動場", pinyin: "yùndòngchǎng", meaning: "area / lapangan olahraga" },
            { hanzi: "喊", pinyin: "hǎn", meaning: "teriak" },
            { hanzi: "過癮", pinyin: "guòyǐn", meaning: "puas / menikmati banget", note: "Contoh: teriak sampai puas" },
            { hanzi: "暫時", pinyin: "zànshí", meaning: "sementara waktu" },
            { hanzi: "歌曲", pinyin: "gēqǔ", meaning: "lagu" },
            { hanzi: "享受", pinyin: "xiǎngshòu", meaning: "menikmati" }
        ],

        /* ---------- Set 18 ---------- */
        [
            { hanzi: "喜帖", pinyin: "xǐtiě", meaning: "undangan nikah" },
            { hanzi: "典禮", pinyin: "diǎnlǐ", meaning: "upacara" },
            { hanzi: "喜酒", pinyin: "xǐjiǔ", meaning: "jamuan pernikahan" },
            { hanzi: "數字", pinyin: "shùzì", meaning: "angka" },
            { hanzi: "幸運", pinyin: "xìngyùn", meaning: "keberuntungan" },
            { hanzi: "習俗", pinyin: "xísú", meaning: "adat istiadat" },
            { hanzi: "古代", pinyin: "gǔdài", meaning: "zaman dulu" },
            { hanzi: "複雜", pinyin: "fùzá", meaning: "ribet / rumit" },
            { hanzi: "詳細", pinyin: "xiángxì", meaning: "detail / terperinci" },
            { hanzi: "禮服", pinyin: "lǐfú", meaning: "baju formal / baju pengantin" },
            { hanzi: "重視", pinyin: "zhòngshì", meaning: "mementingkan" },
            { hanzi: "時代", pinyin: "shídài", meaning: "zaman" },
            { hanzi: "尤其", pinyin: "yóuqí", meaning: "khususnya" },
            { hanzi: "連", pinyin: "lián", meaning: "bahkan" },
            { hanzi: "打扮", pinyin: "dǎban", meaning: "dandan" },
            { hanzi: "正式", pinyin: "zhèngshì", meaning: "formal / resmi" },
            { hanzi: "婚禮", pinyin: "hūnlǐ", meaning: "upacara pernikahan" },
            { hanzi: "雙方", pinyin: "shuāngfāng", meaning: "kedua belah pihak" },
            { hanzi: "敬酒", pinyin: "jìngjiǔ", meaning: "bersulang" },
            { hanzi: "表示", pinyin: "biǎoshì", meaning: "menunjukkan / menyatakan" },
            { hanzi: "百年好合，早生貴子", pinyin: "bǎinián hǎohé, zǎoshēng guìzǐ", meaning: "semoga langgeng sampai akhir hayat dan segera dikaruniai anak", note: "Ucapan selamat untuk pengantin baru" }
        ]

    ];


    /* ==================================================
       RATAKAN JADI SATU ARRAY OBJEK
       ================================================== */

    var VOCAB = [];
    var nextId = 1;

    VOCAB_SETS.forEach(function (words, setIndex) {

        words.forEach(function (w) {

            VOCAB.push({
                id: nextId++,
                set: setIndex + 1,
                hanzi: w.hanzi,
                pinyin: w.pinyin,
                meaning: w.meaning,
                note: w.note || ""
            });
        });
    });


    /* ==================================================
       FUNGSI BANTU
       ================================================== */

    /* Huruf kecil, buang tanda nada (ā á ǎ à ü dst), spasi, apostrof.
       "Gǎn'ēnjié" -> "ganenjie" supaya pencarian "gan en jie"
       atau "ganenjie" tetap ketemu. */

    function normalize(text) {

        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ü/g, "u")
            .replace(/[\s'’\-.,，。]/g, "");
    }


    function search(query, list) {

        var source = list || VOCAB;
        var q = normalize(query);

        if (!q) {
            return source.slice();
        }

        return source.filter(function (item) {

            return (
                item.hanzi.indexOf(query.trim()) !== -1 ||
                normalize(item.pinyin).indexOf(q) !== -1 ||
                normalize(item.meaning).indexOf(q) !== -1
            );
        });
    }


    /* Acak urutan (Fisher–Yates) — berguna untuk flashcard. */

    function shuffle(list) {

        var arr = list.slice();

        for (var i = arr.length - 1; i > 0; i--) {

            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];

            arr[i] = arr[j];
            arr[j] = tmp;
        }

        return arr;
    }


    window.VOCAB = VOCAB;

    window.VOCAB_UTIL = {
        normalize: normalize,
        search: search,
        shuffle: shuffle,
        totalSets: VOCAB_SETS.length
    };

})();
