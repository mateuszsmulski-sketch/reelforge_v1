export type Language = "en" | "pl" | "id";

export const translations = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_creator: "Creator",
    nav_login: "Log in",
    nav_logout: "Log out",
    nav_user: "User",

    // Home - Hero
    hero_badge: "AI Video Generator for Facebook Reels",
    hero_title: "Create viral",
    hero_title_highlight: "AI videos",
    hero_title_suffix: "in seconds",
    hero_desc:
      "ReelForge is the fastest way to produce professional short-form videos. Type a prompt, and our AI generates a ready-to-use reel for Facebook.",
    hero_cta_primary: "Create your first video",
    hero_cta_secondary: "Watch demo",
    hero_stat_1: "10x faster than traditional",
    hero_stat_2: "9:16 Reels format ready",
    hero_stat_3: "4-12s video length",
    hero_stat_4: "100% automation",

    // Home - How it works
    how_title: "How does it work?",
    how_subtitle: "Three simple steps from idea to finished video",
    how_step1_title: "1. Type a prompt",
    how_step1_desc:
      "Describe the scene, style, and mood. Our AI will understand your vision.",
    how_step2_title: "2. Generate video",
    how_step2_desc:
      "AI creates professional vertical 9:16 format video.",
    how_step3_title: "3. Publish to Reels",
    how_step3_desc:
      "Download the finished file and upload directly to Facebook Reels.",

    // Home - Features
    features_title: "Why ReelForge?",
    features_subtitle: "Everything you need to produce viral reels",
    feat_1_title: "Lightning-fast production",
    feat_1_desc: "Generate videos in minutes, not days.",
    feat_2_title: "Reels format",
    feat_2_desc: "Automatic 9:16 format optimized for Facebook.",
    feat_3_title: "AI-powered",
    feat_3_desc: "Advanced models generating realistic scenes.",
    feat_4_title: "Cinematography",
    feat_4_desc: "Professional lighting, camera movement, and composition.",
    feat_5_title: "No limits",
    feat_5_desc: "Create as many projects as you need.",
    feat_6_title: "Viral ready",
    feat_6_desc: "Styles and formats tested against the Reels algorithm.",

    // Home - CTA
    cta_title: "Ready for viral Reels?",
    cta_desc:
      "Join creators who use AI for video production. Generate your first video in a minute.",
    cta_button: "Start for free",

    // Home - Footer
    footer_rights: "All rights reserved.",
    footer_author: "Created by Mateo",

    // Login
    login_title: "Log in to ReelForge",
    login_subtitle: "Start creating viral AI videos for free",
    login_button: "Log in with Kimi",
    login_terms: "By logging in, you agree to the terms of service.",

    // Dashboard
    dash_title: "Your videos",
    dash_subtitle: "Manage your AI projects",
    dash_new_video: "New video",
    dash_empty_title: "No videos yet",
    dash_empty_desc:
      "You don't have any projects yet. Create your first AI video!",
    dash_empty_button: "Create video",
    dash_loading: "Loading...",
    dash_details: "Details",
    dash_delete: "Delete",
    dash_delete_title: "Delete video",
    dash_delete_desc:
      "Are you sure you want to delete this project? This action cannot be undone.",
    dash_cancel: "Cancel",
    dash_status_pending: "Pending",
    dash_status_processing: "Generating...",
    dash_status_completed: "Done",
    dash_status_failed: "Error",

    // Creator
    creator_back: "Back to library",
    creator_title: "New AI video",
    creator_subtitle: "Describe your vision and we'll make it happen",
    creator_project_title: "Project title",
    creator_project_placeholder: "e.g. Burger promo - summer 2025",
    creator_prompt: "AI Prompt",
    creator_prompt_hint: "(describe the scene)",
    creator_prompt_placeholder:
      "e.g. Delicious burger with grilled meat, melting cheddar cheese, on a hot plate, steam rising in slow motion, golden restaurant lighting...",
    creator_prompt_tip:
      "The more detailed the prompt, the better the result. Describe style, lighting, colors, and mood.",
    creator_description: "Description",
    creator_description_optional: "(optional)",
    creator_description_placeholder:
      "Notes for yourself - hashtags, music, call-to-action...",
    creator_duration: "Video length",
    creator_format: "Video format",
    creator_generate: "Generate AI video",
    creator_creating: "Creating...",
    creator_cancel: "Cancel",

    // Player
    player_back: "Back to library",
    player_queue: "In queue",
    player_queue_desc: "Your video is waiting to start generating.",
    player_generating: "Generating video...",
    player_generating_desc: "AI is working on your film. This may take a few minutes.",
    player_done: "Done!",
    player_done_desc: "Your video has been generated successfully.",
    player_error: "Generation error",
    player_error_desc:
      "Unfortunately, there was a problem during generation. Please try again.",
    player_refresh: "Refresh status (demo: finish generation)",
    player_processing: "Processing...",
    player_prompt: "AI Prompt",
    player_notes: "Description / Notes",
    player_download: "Download video",
    player_create_next: "Create another video",
    player_delete_project: "Delete project",
    player_delete_title: "Delete project",
    player_delete_desc:
      'Are you sure you want to delete "{title}"? This action cannot be undone.',
    player_not_found: "Video not found",
    player_not_found_desc:
      "This video may have been deleted or you don't have access to it.",
    player_not_found_button: "Back to library",

    // Not Found
    notfound_title: "404",
    notfound_desc: "Page not found",
    notfound_button: "Back to home",

    // Language
    lang_en: "English",
    lang_pl: "Polski",
    lang_id: "Bahasa Indonesia",
  },

  pl: {
    // Navbar
    nav_home: "Strona główna",
    nav_dashboard: "Dashboard",
    nav_creator: "Kreator",
    nav_login: "Zaloguj się",
    nav_logout: "Wyloguj",
    nav_user: "Użytkownik",

    // Home - Hero
    hero_badge: "Generator wideo AI dla Facebook Reels",
    hero_title: "Twórz wiralowe",
    hero_title_highlight: "filmy AI",
    hero_title_suffix: "w sekundy",
    hero_desc:
      "ReelForge to najszybszy sposób na produkcję profesjonalnych short-form video. Wpisz prompt, a nasza AI wygeneruje gotowy reel na Facebooka.",
    hero_cta_primary: "Stwórz pierwsze wideo",
    hero_cta_secondary: "Zobacz demo",
    hero_stat_1: "10x szybciej niż tradycyjnie",
    hero_stat_2: "Format Reels gotowy",
    hero_stat_3: "Długość wideo",
    hero_stat_4: "Automatyzacja",

    // Home - How it works
    how_title: "Jak to działa?",
    how_subtitle: "Trzy proste kroki od pomysłu do gotowego wideo",
    how_step1_title: "1. Wpisz prompt",
    how_step1_desc:
      "Opisz scenę, styl i nastrój. Nasza AI zrozumie Twoją wizję.",
    how_step2_title: "2. Generuj wideo",
    how_step2_desc:
      "AI tworzy profesjonalne wideo w formacie pionowym 9:16.",
    how_step3_title: "3. Publikuj na Reels",
    how_step3_desc:
      "Pobierz gotowy plik i wrzuć bezpośrednio na Facebook Reels.",

    // Home - Features
    features_title: "Dlaczego ReelForge?",
    features_subtitle: "Wszystko czego potrzebujesz do produkcji viralowych reelów",
    feat_1_title: "Błyskawiczna produkcja",
    feat_1_desc: "Generuj filmy w ciągu minut, nie dni.",
    feat_2_title: "Format Reels",
    feat_2_desc: "Automatyczny format 9:16 zoptymalizowany pod Facebook.",
    feat_3_title: "AI-powered",
    feat_3_desc: "Zaawansowane modele generujące realistyczne sceny.",
    feat_4_title: "Cinematografia",
    feat_4_desc: "Profesjonalne oświetlenie, ruch kamery i kompozycja.",
    feat_5_title: "Bez limitów",
    feat_5_desc: "Twórz tyle projektów, ile potrzebujesz.",
    feat_6_title: "Viral ready",
    feat_6_desc: "Style i formaty sprawdzone pod algorytm Reels.",

    // Home - CTA
    cta_title: "Gotowy na wiralowe Reels?",
    cta_desc:
      "Dołącz do twórców, którzy używają AI do produkcji filmów. Pierwsze wideo generujesz w minutę.",
    cta_button: "Rozpocznij za darmo",

    // Home - Footer
    footer_rights: "Wszelkie prawa zastrzeżone.",
    footer_author: "Stworzone przez Mateo",

    // Login
    login_title: "Zaloguj się do ReelForge",
    login_subtitle: "Zacznij tworzyć wiralowe filmy AI za darmo",
    login_button: "Zaloguj przez Kimi",
    login_terms: "Logując się, akceptujesz warunki korzystania z usługi.",

    // Dashboard
    dash_title: "Twoje filmy",
    dash_subtitle: "Zarządzaj swoimi projektami AI",
    dash_new_video: "Nowe wideo",
    dash_empty_title: "Brak filmów",
    dash_empty_desc:
      "Nie masz jeszcze żadnych projektów. Stwórz swoje pierwsze wideo AI!",
    dash_empty_button: "Stwórz wideo",
    dash_loading: "Ładowanie...",
    dash_details: "Szczegóły",
    dash_delete: "Usuń",
    dash_delete_title: "Usuń wideo",
    dash_delete_desc:
      "Czy na pewno chcesz usunąć ten projekt? Tej operacji nie można cofnąć.",
    dash_cancel: "Anuluj",
    dash_status_pending: "Oczekuje",
    dash_status_processing: "Generowanie...",
    dash_status_completed: "Gotowe",
    dash_status_failed: "Błąd",

    // Creator
    creator_back: "Wróć do biblioteki",
    creator_title: "Nowe wideo AI",
    creator_subtitle: "Opisz swoją wizję, a my ją zrealizujemy",
    creator_project_title: "Tytuł projektu",
    creator_project_placeholder: "np. Burger promo - lato 2025",
    creator_prompt: "Prompt AI",
    creator_prompt_hint: "(opisz scenę)",
    creator_prompt_placeholder:
      "np. Pyszny burger z grillowanym mięsem, topiący się ser cheddar, na gorącej płycie, para unosząca się w zwolnionym tempie, złote oświetlenie restauracji...",
    creator_prompt_tip:
      "Im bardziej szczegółowy prompt, tym lepszy rezultat. Opisz styl, oświetlenie, kolory i nastrój.",
    creator_description: "Opis",
    creator_description_optional: "(opcjonalny)",
    creator_description_placeholder:
      "Notatki dla siebie - hashtagi, muzyka, call-to-action...",
    creator_duration: "Długość wideo",
    creator_format: "Format wideo",
    creator_generate: "Generuj wideo AI",
    creator_creating: "Tworzenie...",
    creator_cancel: "Anuluj",

    // Player
    player_back: "Wróć do biblioteki",
    player_queue: "W kolejce",
    player_queue_desc: "Twoje wideo czeka na rozpoczęcie generowania.",
    player_generating: "Generowanie wideo...",
    player_generating_desc:
      "AI pracuje nad Twoim filmem. To może potrwać kilka minut.",
    player_done: "Gotowe!",
    player_done_desc: "Twoje wideo zostało wygenerowane pomyślnie.",
    player_error: "Błąd generowania",
    player_error_desc:
      "Niestety, wystąpił problem podczas generowania. Spróbuj ponownie.",
    player_refresh: "Odśwież status (demo: zakończ generowanie)",
    player_processing: "Przetwarzanie...",
    player_prompt: "Prompt AI",
    player_notes: "Opis / Notatki",
    player_download: "Pobierz wideo",
    player_create_next: "Stwórz kolejne wideo",
    player_delete_project: "Usuń projekt",
    player_delete_title: "Usuń projekt",
    player_delete_desc:
      'Czy na pewno chcesz usunąć "{title}"? Tej operacji nie można cofnąć.',
    player_not_found: "Nie znaleziono wideo",
    player_not_found_desc:
      "To wideo mogło zostać usunięte lub nie masz do niego dostępu.",
    player_not_found_button: "Wróć do biblioteki",

    // Not Found
    notfound_title: "404",
    notfound_desc: "Strona nie została znaleziona",
    notfound_button: "Wróć do strony głównej",

    // Language
    lang_en: "English",
    lang_pl: "Polski",
    lang_id: "Bahasa Indonesia",
  },

  id: {
    // Navbar
    nav_home: "Beranda",
    nav_dashboard: "Dasbor",
    nav_creator: "Kreator",
    nav_login: "Masuk",
    nav_logout: "Keluar",
    nav_user: "Pengguna",

    // Home - Hero
    hero_badge: "Generator Video AI untuk Facebook Reels",
    hero_title: "Buat video",
    hero_title_highlight: "AI viral",
    hero_title_suffix: "dalam hitungan detik",
    hero_desc:
      "ReelForge adalah cara tercepat untuk memproduksi video short-form profesional. Ketik prompt, dan AI kami akan menghasilkan reel siap pakai untuk Facebook.",
    hero_cta_primary: "Buat video pertama Anda",
    hero_cta_secondary: "Lihat demo",
    hero_stat_1: "10x lebih cepat dari tradisional",
    hero_stat_2: "Format Reels 9:16 siap",
    hero_stat_3: "Durasi video 4-12s",
    hero_stat_4: "100% otomatisasi",

    // Home - How it works
    how_title: "Bagaimana cara kerjanya?",
    how_subtitle: "Tiga langkah sederhana dari ide ke video jadi",
    how_step1_title: "1. Ketik prompt",
    how_step1_desc:
      "Deskripsikan adegan, gaya, dan suasana. AI kami akan memahami visi Anda.",
    how_step2_title: "2. Hasilkan video",
    how_step2_desc:
      "AI membuat video profesional dalam format vertikal 9:16.",
    how_step3_title: "3. Publikasikan ke Reels",
    how_step3_desc:
      "Unduh file yang sudah jadi dan unggah langsung ke Facebook Reels.",

    // Home - Features
    features_title: "Mengapa ReelForge?",
    features_subtitle: "Semua yang Anda butuhkan untuk memproduksi reels viral",
    feat_1_title: "Produksi kilat",
    feat_1_desc: "Hasilkan video dalam hitungan menit, bukan hari.",
    feat_2_title: "Format Reels",
    feat_2_desc: "Format otomatis 9:16 yang dioptimalkan untuk Facebook.",
    feat_3_title: "Didukung AI",
    feat_3_desc: "Model canggih yang menghasilkan adegan realistis.",
    feat_4_title: "Sinematografi",
    feat_4_desc: "Pencahayaan profesional, gerakan kamera, dan komposisi.",
    feat_5_title: "Tanpa batas",
    feat_5_desc: "Buat sebanyak mungkin proyek yang Anda butuhkan.",
    feat_6_title: "Siap viral",
    feat_6_desc: "Gaya dan format yang diuji untuk algoritma Reels.",

    // Home - CTA
    cta_title: "Siap untuk Reels viral?",
    cta_desc:
      "Bergabunglah dengan kreator yang menggunakan AI untuk produksi video. Hasilkan video pertama Anda dalam satu menit.",
    cta_button: "Mulai gratis",

    // Home - Footer
    footer_rights: "Hak cipta dilindungi.",
    footer_author: "Dibuat oleh Mateo",

    // Login
    login_title: "Masuk ke ReelForge",
    login_subtitle: "Mulai buat video AI viral secara gratis",
    login_button: "Masuk dengan Kimi",
    login_terms: "Dengan masuk, Anda menyetujui syarat layanan.",

    // Dashboard
    dash_title: "Video Anda",
    dash_subtitle: "Kelola proyek AI Anda",
    dash_new_video: "Video baru",
    dash_empty_title: "Belum ada video",
    dash_empty_desc:
      "Anda belum memiliki proyek apa pun. Buat video AI pertama Anda!",
    dash_empty_button: "Buat video",
    dash_loading: "Memuat...",
    dash_details: "Detail",
    dash_delete: "Hapus",
    dash_delete_title: "Hapus video",
    dash_delete_desc:
      "Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.",
    dash_cancel: "Batal",
    dash_status_pending: "Menunggu",
    dash_status_processing: "Menghasilkan...",
    dash_status_completed: "Selesai",
    dash_status_failed: "Gagal",

    // Creator
    creator_back: "Kembali ke pustaka",
    creator_title: "Video AI baru",
    creator_subtitle: "Deskripsikan visi Anda, dan kami akan mewujudkannya",
    creator_project_title: "Judul proyek",
    creator_project_placeholder: "mis. Promo burger - musim panas 2025",
    creator_prompt: "Prompt AI",
    creator_prompt_hint: "(deskripsikan adegan)",
    creator_prompt_placeholder:
      "mis. Burger lezat dengan daging panggang, keju cheddar meleleh, di atas piring panas, uap mengepul dalam gerak lambat, pencahayaan emas restoran...",
    creator_prompt_tip:
      "Semakin detail prompt, semakin baik hasilnya. Deskripsikan gaya, pencahayaan, warna, dan suasana.",
    creator_description: "Deskripsi",
    creator_description_optional: "(opsional)",
    creator_description_placeholder:
      "Catatan untuk diri sendiri - hashtag, musik, ajakan bertindak...",
    creator_duration: "Durasi video",
    creator_format: "Format video",
    creator_generate: "Hasilkan video AI",
    creator_creating: "Membuat...",
    creator_cancel: "Batal",

    // Player
    player_back: "Kembali ke pustaka",
    player_queue: "Dalam antrean",
    player_queue_desc: "Video Anda menunggu untuk mulai dihasilkan.",
    player_generating: "Menghasilkan video...",
    player_generating_desc:
      "AI sedang mengerjakan film Anda. Ini mungkin memerlukan beberapa menit.",
    player_done: "Selesai!",
    player_done_desc: "Video Anda telah berhasil dihasilkan.",
    player_error: "Kesalahan generasi",
    player_error_desc:
      "Sayangnya, ada masalah saat menghasilkan video. Silakan coba lagi.",
    player_refresh: "Segarkan status (demo: selesaikan generasi)",
    player_processing: "Memproses...",
    player_prompt: "Prompt AI",
    player_notes: "Deskripsi / Catatan",
    player_download: "Unduh video",
    player_create_next: "Buat video lain",
    player_delete_project: "Hapus proyek",
    player_delete_title: "Hapus proyek",
    player_delete_desc:
      'Apakah Anda yakin ingin menghapus "{title}"? Tindakan ini tidak dapat dibatalkan.',
    player_not_found: "Video tidak ditemukan",
    player_not_found_desc:
      "Video ini mungkin telah dihapus atau Anda tidak memiliki akses ke sana.",
    player_not_found_button: "Kembali ke pustaka",

    // Not Found
    notfound_title: "404",
    notfound_desc: "Halaman tidak ditemukan",
    notfound_button: "Kembali ke beranda",

    // Language
    lang_en: "English",
    lang_pl: "Polski",
    lang_id: "Bahasa Indonesia",
  },
} as const;

export type Translations = typeof translations.en;
