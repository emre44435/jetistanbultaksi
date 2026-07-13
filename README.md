# JETT İstanbul Taksi Web Sitesi

JETT İstanbul Taksi için hazırlanmış, tek sayfalık, mobil uyumlu ve doğrudan yayına alınabilir statik web sitesi projesidir. Proje saf HTML5, CSS3 ve vanilla JavaScript kullanır; harici framework, font, ikon paketi veya CDN bağımlılığı yoktur.

## Dosya Yapısı

```text
/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── humans.txt
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── jett-logo.webp
        ├── jett-logo.png
        ├── hero-istanbul.avif
        ├── hero-istanbul.webp
        ├── hero-istanbul-mobile.avif
        ├── hero-istanbul-mobile.webp
        ├── og-jett-istanbul-taksi.jpg
        ├── favicon.svg
        ├── favicon-32x32.png
        ├── apple-touch-icon.png
        ├── icon-192.png
        └── icon-512.png
```


## Mobil Menü ve Uyumluluk Düzeltmesi

Bu sürümde mobil hamburger menü yeniden düzenlenmiştir. Menü artık 360–768 px genişliklerde tam ekran yüksekliğinde açılır, iOS/Android kaydırma kilidi uygular, Escape tuşuyla kapanır, menü bağlantısına dokununca otomatik kapanır ve sabit alt iletişim çubuğuyla çakışmaz. CSS ve JavaScript dosyalarında önbellek sürüm parametresi kullanıldığı için GitHub’a yükledikten sonra güncel dosyalar daha hızlı alınır.

## Yayınlama

### GitHub’a yükleme

1. Yeni bir GitHub deposu oluşturun.
2. Bu klasörün **içindeki tüm dosya ve klasörleri** depo kök dizinine yükleyin.
3. Ana giriş dosyası `index.html` dosyasıdır.
4. GitHub Pages kullanılacaksa depo ayarlarından **Settings → Pages** bölümüne girin ve yayın kaynağı olarak ana branch’in kök dizinini seçin.
5. Özel alan adı kullanılırken GitHub Pages tarafında alan adını ekleyin ve DNS kayıtlarını GitHub’ın verdiği değerlere göre düzenleyin.

### Hostinger’a yükleme

1. Hostinger hPanel’de ilgili hosting hesabını açın.
2. **Dosya Yöneticisi → public_html** klasörüne girin.
3. `public_html` içindeki eski site dosyalarını yedekledikten sonra bu projenin tüm dosyalarını yükleyin.
4. `index.html`, `404.html`, `assets` klasörü ve diğer kök dosyaların doğrudan `public_html` içinde olduğundan emin olun.
5. Siteyi `https://jetistanbultaksi.com.tr/` adresinden kontrol edin.

## Görseller

Tüm görseller hazır ve optimize edilmiş olarak `assets/images/` klasöründedir.

- Masaüstü hero: `hero-istanbul.avif` ve `hero-istanbul.webp`
- Mobil hero: `hero-istanbul-mobile.avif` ve `hero-istanbul-mobile.webp`
- Logo: `jett-logo.webp` ve `jett-logo.png`
- Sosyal paylaşım görseli: `og-jett-istanbul-taksi.jpg`
- Favicon ve uygulama ikonları: `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`

HTML içerisindeki görsel yolları bu dosya adlarıyla birebir eşleşmektedir.

## Telefon ve WhatsApp Numarasını Değiştirme

Mevcut bilgiler:

- Görünen telefon: `0536 616 12 63`
- Telefon bağlantısı: `tel:+905366161263`
- WhatsApp numarası: `905366161263`

Değişiklik gerektiğinde şu dosyalarda arama-değiştirme yapın:

- `index.html`
- `404.html`
- `assets/js/main.js`

`main.js` içindeki WhatsApp rezervasyon adresinde bulunan `905366161263` numarasını da yeni numarayla değiştirin.

## WhatsApp Rezervasyon Formu

Rezervasyon formu backend veya veritabanı kullanmaz. Form alanları tarayıcıda JavaScript ile doğrulanır ve bilgiler `encodeURIComponent` kullanılarak güvenli biçimde WhatsApp mesajına dönüştürülür. Kullanıcı verileri site tarafından kaydedilmez veya başka bir sunucuya gönderilmez.

## Domain ve HTTPS Kontrolü

Alan adı bağlandıktan sonra:

1. `https://jetistanbultaksi.com.tr/` adresinin güvenli bağlantıyla açıldığını kontrol edin.
2. HTTP adresinin HTTPS’e yönlendirildiğini doğrulayın.
3. Tarayıcı geliştirici araçlarında eksik dosya, 404 kaynak veya JavaScript hatası olmadığını kontrol edin.
4. Logo, favicon, hero görseli, telefon ve WhatsApp bağlantılarını masaüstü ve mobilde test edin.

## Google Search Console

1. Google Search Console’da `https://jetistanbultaksi.com.tr/` mülkünü ekleyin.
2. DNS kaydıyla alan adı sahipliğini doğrulayın.
3. Site haritası bölümüne `sitemap.xml` gönderin.
4. Ana sayfa için URL Denetimi yapın ve dizine ekleme isteği gönderin.

Site haritası adresi:

```text
https://jetistanbultaksi.com.tr/sitemap.xml
```

## Performans Testi

Yayın sonrası PageSpeed Insights üzerinden hem mobil hem masaüstü testini çalıştırın. Sunucu tarafında Brotli/Gzip sıkıştırması, uzun süreli statik dosya önbelleği ve HTTP/2 veya HTTP/3 etkinse performans daha yüksek olacaktır.

Kontrol adresi:

```text
https://pagespeed.web.dev/
```

## Önemli Not

Alan adı farklı bir hosting firmasından yönetiliyorsa, yeni site tamamen hazır olmadan nameserver veya DNS değişikliği yapmayın. Önce dosyaları hosting ortamında hazırlayın ve test edin; ardından alan adını yeni yayına yönlendirin.
