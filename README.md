# FlowPilot — İş Süreci Otomasyon Ajanı

FlowPilot, şirketlerdeki günlük operasyon taleplerini güvenli ve denetlenebilir iş akışlarına dönüştüren portföy projesidir. Kullanıcı doğal dille bir talep girer; uygulama talebi sınıflandırır, gerekli alanları toplar, anlaşılır bir onay planı çıkarır, örnek işletme verisi üzerinde deterministik bir işlem çalıştırır ve sonucu onay geçmişine kaydeder.

Bu proje finansal raporlama uygulaması değildir. Finansal metrikler, grafikler veya rapor panoları yerine operasyon gelen kutusu, playbook seçimi, sorumlu/onay adımları, güvenlik sınırları ve iş akışı devri üzerine kuruludur.

## Desteklenen playbook’lar

- **Satın alma onayına yönlendirme:** Tutar ve kategoriye göre onay rotası hazırlar; sipariş oluşturmaz.
- **Müşteri takip taslağı:** Müşteri ve konu bilgisiyle taslak hazırlar; e-posta göndermez.
- **Düşük stok uyarısı:** Örnek envanteri eşikle karşılaştırır; bildirim göndermez.
- **Fatura/belge girişi:** Belgeyi inceleme kuyruğuna alır; muhasebe kaydı oluşturmaz.

## Ücretsiz yerel mod

Varsayılan **Kural tabanlı / yerel** mod ürünün tam çalışan sürümüdür. API anahtarı, ücretli LLM hesabı veya internet bağlantısı gerekmez. Kural tabanlı sınıflandırma ve örnek veriler üzerinde deterministik çalışır.

## İsteğe bağlı sağlayıcılar

Yapay zekâ sağlayıcısı ekranında kullanıcı isterse kendi OpenAI uyumlu uç noktasını veya yerel Ollama sunucusunu tanımlayabilir. Hiçbir anahtar repoya gömülmez ve varsayılan modda hiçbir ücretli API çağrısı yapılmaz.

## Güvenlik sınırları

FlowPilot gerçek e-posta göndermez, sipariş vermez, dış sistemleri değiştirmez ve muhasebe kaydı oluşturmaz. Etkili bir işlemden önce insan onayı gösterilir. Bu sınırlar demoda özellikle görünür tutulur.

## Windows’ta çalıştırma

1. Node.js 18 veya daha yeni bir sürüm kurun.
2. PowerShell’de proje klasörünü açın.
3. Testleri çalıştırın: `npm test`
4. Uygulamayı başlatın: `npm start`
5. Tarayıcıda `http://localhost:4173` adresini açın.

Projenin çalışma zamanı bağımlılığı yoktur; yalnızca Node.js gerekir.

## Ekran görüntüleri

`screenshots/` klasöründe şu ekranlar bulunur:

- Operasyon gelen kutusu ve sınıflandırılmış satın alma talebi
- Düşük stok playbook’u için onay planı ve sonuç
- Onay geçmişi ve yerel sağlayıcı ayarları

## Proje yapısı

- `index.html`: Türkçe uygulama arayüzü
- `styles.css`: görsel tasarım ve responsive düzen
- `app.js`: arayüz etkileşimleri ve oturum içi geçmiş
- `automation.js`: playbook’lar, sınıflandırma ve deterministik sonuçlar
- `tests/automation.test.js`: otomatik iş mantığı testleri
- `server.js`: bağımlılıksız yerel web sunucusu
