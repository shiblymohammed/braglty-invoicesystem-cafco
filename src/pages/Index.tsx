import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Index = () => {
  const invoiceDetails = {
    invoiceNumber: "BRG-2025-001",
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
    dueDate: "On or before project delivery",
    from: {
      name: "Muhammed Shibily A",
      email: "shibilymohammed75@gmail.com",
      phone: "+91 8590313639"
    },
    paymentAccount: {
      name: "Muhammed Riyas",
      upi: "7902612134@superyes",
      contact: "+91 8590313639",
      email: "hello@bragtly.com"
    },
    billTo: {
      name: "CAFCO TRADING",
      business: "Furniture Solutions Provider"
    },
    campaignTitle: "Rapid Sale Campaign - 1 Month",
    services: [
      { description: "Social Media Handling (1 Month Campaign)", amount: "Included" },
      { description: "Local SEO - Google Review & Profile Management", amount: "Included" },
      { description: "Meta Ads Setup & Management (Ad Budget Excluded)", amount: "Included" },
      { description: "Custom Design Posters (10 Designs)", amount: "Included" },
      { description: "Presentation Videos (4 Videos)", amount: "Included" },
      { description: "Basic Brandbook & Colour Palette for Existing Logo", amount: "Included" },
    ],
    exclusions: [
      "Meta Ads running cost (Ad Budget) - to be handled by client",
      "Domain purchase cost (if required beyond basic setup)",
      "Any third-party integrations or services not mentioned in the scope"
    ],
    total: 25000,
    advance: 7500,
    remaining: 17500,
  };

  const handlePayment = () => {
    // UPI payment link with phone number
    const upiLink = `upi://pay?pa=7902612134@superyes&pn=Bragtly&mc=0000&tid=CAFCO${Date.now()}&tr=CAFCOINV001&tn=Advance Payment CAFCO Campaign&am=${invoiceDetails.advance}&cu=INR`;
    
    // Open UPI link
    window.location.href = upiLink;
  };

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    // Decide orientation based on content aspect ratio
    const pagePortraitRatio = 210 / 297; // A4 portrait
    const canvasRatio = canvas.width / canvas.height;
    const orientation: 'p' | 'l' = canvasRatio > pagePortraitRatio ? 'l' : 'p';

    const pdf = new jsPDF(orientation, "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Fit the entire invoice into one page with margins
    const margin = 10; // mm
    const availableWidth = pdfWidth - margin * 2;
    const availableHeight = pdfHeight - margin * 2;

    const scale = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
    const imgWidth = canvas.width * scale;
    const imgHeight = canvas.height * scale;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    pdf.save(`${invoiceDetails.invoiceNumber}.pdf`);
  };

  // Chat group and contacts helpers
  const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/JlM4hjJPTziIjlUzpq7Z4L';
  const handleChatGroup = () => {
    window.open(WHATSAPP_GROUP_URL, '_blank');
  };

  const formatPhoneForWhatsApp = (phone: string) => phone.replace(/\D/g, '');
  const openWhatsAppChat = (phone: string) => {
    const digits = formatPhoneForWhatsApp(phone);
    const url = `https://wa.me/${digits}`;
    window.open(url, '_blank');
  };



  const team = [
    {
      name: 'Riyas',
      title: 'Head of Digital Strategy & Analytics',
      phone: '+91 79026 12134',
      bio: 'A data-driven digital marketer specializing in campaign strategy, audience insights, and performance analytics. Riyas ensures every marketing initiative aligns with measurable growth and brand objectives.',
    },
    {
      name: 'Shameer',
      title: 'Creative Director, Visuals & Motion Design',
      phone: '+91 70340 78982',
      bio: 'Leads the creative wing with expertise in video production, VFX, and 3D visualization. Shameer brings ideas to life through visually compelling storytelling and modern design aesthetics.',
    },
    {
      name: 'Shibily',
      title: 'Technical Lead, Web & Application Development',
      phone: '+91 85903 13639',
      bio: 'Architects and develops scalable digital platforms with a focus on performance, security, and user experience. Shibily bridges technology with creative design to build seamless web ecosystems.',
    },
    {
      name: 'Sinan',
      title: 'Social Media & Brand Engagement Strategist',
      phone: '+91 75939 50362',
      bio: 'Drives brand voice and audience engagement across platforms. Sinan blends creative storytelling with real-time trend analysis to grow communities and strengthen digital presence.',
    },
    {
      name: 'Rahul',
      title: 'SEO & Growth Marketing Specialist',
      phone: '+91 90611 75940',
      bio: 'Focused on search visibility, organic reach, and performance optimization. Rahul crafts data-backed strategies to enhance brand discoverability and digital ROI.',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Invoice container for PDF capture */}
        <div ref={invoiceRef}>
          {/* Header - Dark Background */}
          <div className="bg-foreground text-background rounded-t-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">BRAGTLY</h1>
                <p className="text-xs sm:text-sm opacity-90">Digital Marketing • Web App Development • Video Production • Business Growth Strategy</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold mb-1">INVOICE</p>
                <p className="text-sm opacity-90">{invoiceDetails.invoiceNumber}</p>
              </div>
            </div>
          </div>

          {/* Invoice Dates */}
          <Card className="shadow-lg border-x border-border">
            <div className="p-6 bg-muted/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-foreground">INVOICE DATE:</span>
                  <span className="ml-3 text-muted-foreground">{invoiceDetails.date}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">DUE DATE:</span>
                  <span className="ml-3 text-muted-foreground">{invoiceDetails.dueDate}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* From & Bill To */}
          <Card className="shadow-lg border-x border-border">
            <div className="p-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-3">FROM</p>
                  <p className="text-lg font-bold text-foreground mb-1">{invoiceDetails.from.name}</p>
                  <p className="text-sm text-muted-foreground">Email: {invoiceDetails.from.email}</p>
                  <p className="text-sm text-muted-foreground">Phone: {invoiceDetails.from.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-3">BILL TO</p>
                  <p className="text-lg font-bold text-foreground mb-1">{invoiceDetails.billTo.name}</p>
                  <p className="text-sm text-muted-foreground">{invoiceDetails.billTo.business}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Campaign Description */}
          <Card className="shadow-lg border-x border-border">
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h2 className="text-lg font-bold text-foreground mb-4">Campaign Description</h2>
                  <p className="text-base font-semibold text-foreground mb-4">{invoiceDetails.campaignTitle}</p>
                  
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Scope of Work</h3>
                  <ul className="space-y-2">
                    {invoiceDetails.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span className="text-sm text-foreground">{service.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg border border-border">
                  <h3 className="text-sm font-bold text-foreground uppercase mb-4">Exclusions</h3>
                  <ul className="space-y-3">
                    {invoiceDetails.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-destructive mr-2 mt-0.5 text-xs">□</span>
                        <span className="text-xs text-muted-foreground leading-relaxed">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Amount */}
          <Card className="shadow-lg border-x border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-foreground text-background">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-8 py-4 text-right text-xs font-bold uppercase tracking-wider">
                      Amount (INR)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-8 py-6 text-sm font-medium text-foreground">
                      {invoiceDetails.campaignTitle}
                    </td>
                    <td className="px-8 py-6 text-lg font-bold text-foreground text-right">
                      ₹{invoiceDetails.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-8 py-6 text-base font-bold text-foreground">
                      Total (INR)
                    </td>
                    <td className="px-8 py-6 text-xl font-bold text-foreground text-right">
                      ₹{invoiceDetails.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Payment Terms */}
          <Card className="shadow-lg border-x border-border">
            <div className="p-8">
              <h2 className="text-lg font-bold text-foreground mb-6">Payment Terms</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border-l-4 border-success pl-6 py-4">
                  <p className="text-sm font-bold text-foreground mb-2">30% Advance Payment</p>
                  <p className="text-xs text-muted-foreground mb-3">Due immediately to begin project</p>
                  <p className="text-3xl font-bold text-success">₹{invoiceDetails.advance.toLocaleString('en-IN')}</p>
                </div>
                <div className="border-l-4 border-muted-foreground pl-6 py-4">
                  <p className="text-sm font-bold text-foreground mb-2">Ongoing & Phase-Based Payments</p>
                  <p className="text-xs text-muted-foreground mb-3">Covers operational costs (content production, ad spend, tools) and periodic service fees based on phases or deliverables.</p>
                  <p className="text-3xl font-bold text-muted-foreground">₹{invoiceDetails.remaining.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Download Invoice Button */}
        <Card className="shadow-lg border-x border-b border-border rounded-b-2xl mt-6">
          <div className="p-8">
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={handleDownloadPDF}
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-16 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v4h6V9h3.67L12 2z"/>
                </svg>
                Download Invoice (PDF)
              </Button>
              <p className="text-sm text-muted-foreground font-medium">
                The invoice is available as a downloadable PDF resource.
              </p>
            </div>
          </div>
        </Card>

        {/* Existing Payment Button */}
        <Card className="shadow-lg border-x border-b border-border rounded-b-2xl">
          <div className="p-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground font-semibold">
                Payable now: ₹{invoiceDetails.advance.toLocaleString('en-IN')}
              </p>
              <Button 
                onClick={handlePayment}
                size="lg"
                className="w-full sm:w-auto bg-success hover:bg-success/90 text-success-foreground font-bold text-lg px-16 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.51 11.87l-4.5-7.79C16.6 3.37 15.82 3 15 3H9c-.82 0-1.6.37-2.01 1.08l-4.5 7.79c-.2.34-.49.85-.49 1.29v5.59C2 19.99 3.01 21 4.25 21h15.5c1.24 0 2.25-1.01 2.25-2.25v-5.59c0-.44-.29-.95-.49-1.29zM12 17.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
                Click here to pay now
              </Button>
              <p className="text-sm text-muted-foreground font-medium">
                Secure payment via Google Pay / UPI
              </p>
            </div>
          </div>
        </Card>

        {/* Footer - Payment Details */}
        <div className="mt-8 bg-foreground text-background rounded-lg p-6">
          <h3 className="text-sm font-bold uppercase mb-4">Payment Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="opacity-70 mb-1">ACCOUNT NAME</p>
              <p className="font-semibold">{invoiceDetails.paymentAccount.name}</p>
            </div>
            <div>
              <p className="opacity-70 mb-1">PHONE / UPI</p>
              <p className="font-semibold">{invoiceDetails.paymentAccount.upi}</p>
            </div>
            <div>
              <p className="opacity-70 mb-1">CONTACT</p>
              <p className="font-semibold">{invoiceDetails.paymentAccount.contact}</p>
            </div>
            <div>
              <p className="opacity-70 mb-1">EMAIL</p>
              <p className="font-semibold break-all">{invoiceDetails.paymentAccount.email}</p>
            </div>
          </div>
        </div>

        {/* Resources & Analytics Section */}
        <Card className="mt-8 shadow-lg border border-border">
          <div className="p-8">
            <h2 className="text-lg font-bold text-foreground mb-3">Resources & Analytics</h2>
            <p className="text-sm text-muted-foreground">
              After starting the work, all resources and analytics updates will be shown on this page.
            </p>
            <Separator className="my-6" />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-xs font-semibold text-muted-foreground">Resources</p>
                <p className="text-sm text-foreground mt-1">Links, files, and project assets will appear here.</p>
              </div>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-xs font-semibold text-muted-foreground">Analytics</p>
                <p className="text-sm text-foreground mt-1">Graphs and performance insights will appear here.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat With Us & Call Us */}
        <Card className="mt-8 shadow-lg border border-border">
          <div className="p-8">
            <h2 className="text-lg font-bold text-foreground mb-2">Chat With Us</h2>
            <p className="text-sm text-muted-foreground mb-4">Open our WhatsApp group chat for support, updates, and additional requirements.</p>
            <Button 
              onClick={handleChatGroup}
              size="lg"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.03 3 3 6.58 3 11c0 1.99.74 3.83 2 5.29L4 21l4.85-1.27C10.03 20.58 11 20.77 12 20.77c4.97 0 9-3.58 9-8.77S16.97 3 12 3z"/>
              </svg>
              Chat on WhatsApp
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">Note: Clicking opens the WhatsApp group chat.</p>


          </div>
        </Card>

        {/* Team Overview */}
        <Card className="mt-8 shadow-lg border border-border">
          <div className="p-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Team Overview</h2>
            <div className="space-y-6">
              {team.map((t) => (
                <div key={t.phone} className="rounded-lg border border-border p-4 bg-muted/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{t.name} — {t.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">📞 {t.phone}</p>
                      <p className="text-sm text-foreground mt-2">{t.bio}</p>
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <a
                        href={`tel:${formatPhoneForWhatsApp(t.phone)}`}
                        className="px-3 py-2 rounded-md bg-foreground text-background text-xs font-semibold hover:bg-foreground/90"
                      >
                        Call
                      </a>
                      <Button
                        variant="outline"
                        onClick={() => openWhatsAppChat(t.phone)}
                        className="text-xs"
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
