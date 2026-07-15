ELİF & KEREM — DİJİTAL DAVETİYE
====================================

1. SİTE NASIL AÇILIR?
Klasördeki index.html dosyasına çift tıklayın. Site internet bağlantısı olmadan da açılır. Google Maps, WhatsApp, Google Takvim ve Outlook bağlantıları için internet bağlantısı gerekir.

2. HOSTINGER'A NASIL YÜKLENİR?
Hostinger hPanel > Dosya Yöneticisi > public_html klasörünü açın. ZIP dosyasını public_html içine yükleyip “Ayıkla” seçeneğini kullanın. index.html dosyası doğrudan public_html içinde bulunmalıdır. Eski bir index.php veya index.html varsa yedekleyip kaldırın.

3. GITHUB PAGES'TE NASIL YAYINLANIR?
Yeni bir GitHub deposu oluşturun. Bu klasördeki tüm dosya ve klasörleri deponun ana dizinine yükleyin. Settings > Pages bölümünde Source olarak “Deploy from a branch”, Branch olarak “main / root” seçin. GitHub'ın verdiği bağlantı birkaç dakika içinde açılır.

4. İSİMLER NEREDEN DEĞİŞTİRİLİR?
script.js dosyasının en üstündeki invitationConfig nesnesinde brideName ve groomName alanlarını değiştirin.

5. TARİH VE SAAT NEREDEN DEĞİŞTİRİLİR?
script.js içindeki eventDate ve eventEnd alanlarını ISO biçiminde değiştirin. Örnek: 2027-06-20T19:30:00+03:00. Sayaç ve takvim bağlantıları otomatik güncellenir. HTML içindeki Event JSON-LD alanını da SEO için aynı tarihle güncelleyin.

6. TELEFON VE WHATSAPP NUMARASI NEREDEN DEĞİŞTİRİLİR?
script.js içindeki phone ve whatsapp alanlarını ülke koduyla, boşluksuz yazın. Örnek: 905321234567.

7. GOOGLE MAPS BAĞLANTISI NEREDEN DEĞİŞTİRİLİR?
Google Maps'te mekânı açın, Paylaş > Bağlantıyı kopyala seçeneğini kullanın ve script.js içindeki mapUrl alanına yapıştırın.

8. FOTOĞRAFLAR NASIL DEĞİŞTİRİLİR?
assets/images klasöründeki görselleri aynı dosya adlarıyla ve tercihen WebP biçiminde değiştirin. Önerilen ölçüler: hero 1920x1280, çift fotoğrafları 1200x900, sosyal ön izleme 1200x630. Görselleri değiştirdikten sonra index.html içindeki alt metinleri de düzenleyin.

9. MÜZİK NASIL DEĞİŞTİRİLİR?
Yeni telifsiz MP3 dosyasını assets/audio klasörüne yükleyin. Dosya adı farklıysa script.js içindeki musicUrl alanını güncelleyin.

10. DOMAIN VE SEO BAĞLANTILARI NEREDEN DEĞİŞTİRİLİR?
index.html içindeki canonical, Open Graph URL/görsel adresleri, Twitter görseli ve JSON-LD alanlarında bulunan https://davetiye-ornek.com/ adresini kendi domaininizle değiştirin. robots.txt ve sitemap.xml dosyalarında da aynı domaini güncelleyin. script.js içindeki siteUrl alanını değiştirin.

11. RSVP / WHATSAPP
Katılım formu herhangi bir veriyi sunucuya kaydetmez. Kullanıcının girdiği bilgiler cihaz üzerinde WhatsApp mesajına dönüştürülür. Alıcı numarası invitationConfig.whatsapp alanıdır.

12. MASA BİLGİLERİ
Demo davetli listesi script.js içindeki initTable fonksiyonunda yer alır. İsimleri ve masa bilgilerini aynı yapı içinde değiştirebilirsiniz. Gerçek bir davetli sistemi için sunucu ve veritabanı gerekir.

13. HEDİYE / IBAN
script.js içindeki iban alanı demo değer içerir. Gerçek kullanımda bu alanı doğru bilgiyle değiştirin.

14. DOSYA YAPISI
index.html: Sayfa içeriği ve SEO
style.css: Tüm tasarım ve mobil uyumluluk
script.js: Ayarlar ve bütün etkileşimler
assets/images: Yerel WebP görseller
assets/audio: Yerel arka plan müziği
favicon.svg: Tarayıcı sekmesi simgesi
site.webmanifest: Mobil uygulama görünümü
robots.txt ve sitemap.xml: Arama motoru dosyaları

15. YAYIN ÖNCESİ KONTROL
Telefon, WhatsApp ve harita bağlantılarını gerçek bilgilerle güncelleyin. Domain adreslerini değiştirin. Farklı telefonlarda açılış zarfını, mobil alt menüyü, RSVP formunu ve takvim dosyasını kontrol edin.
