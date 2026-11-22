(() => {
  const VCARD = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Automora Tech Solutions LLP",
    "ORG:Automora Tech Solutions LLP",
    "X-ABShowAs:COMPANY",
    "TEL;TYPE=WORK,VOICE:+919004015087",
    "TEL;TYPE=WORK,VOICE:+919819810460",
    "EMAIL;TYPE=WORK,INTERNET:info@automoratechsolutions.com",
    "URL:https://automoratechsolutions.com",
    "ADR;TYPE=WORK:;;Mumbai / Thane;Maharashtra;;India",
    "X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/automoratechsolutions/",
    "X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/company/automora-tech-solutions-llp",
    "X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/profile.php?id=61594725615794",
    "NOTE:AI & Automation | Websites & E-commerce | Mobile Apps | Custom Software | CRM / ERP | WhatsApp Automation | SEO & Digital Marketing | Cybersecurity",
    "END:VCARD",
  ].join("\r\n");

  const saveBtn = document.getElementById("saveContact");
  const shareBtn = document.getElementById("shareBtn");
  const toastEl = document.getElementById("toast");
  let toastTimer;

  const showToast = (message) => {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  };

  const saveContact = () => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "automora-tech-solutions.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast("Contact ready — open it to save");
  };

  const shareCard = async () => {
    const data = {
      title: "Automora Tech Solutions LLP",
      text: "AI, automation, websites, apps and software — Automora Tech Solutions LLP.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(data.url);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy link");
    }
  };

  if (saveBtn) saveBtn.addEventListener("click", saveContact);
  if (shareBtn) shareBtn.addEventListener("click", shareCard);
})();
