import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Index = () => {
  const invoiceDetails = {
    invoiceNumber: "BRG-2025-002",
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
    total: 13000,
    upfront: 13000,
  };

  // Payment breakdown
  const total = 25000;
  const paidAmount = 7500; // 30% already paid
  const remainingAmount = 17500; // 70% pending
  const nextMonthAdvance = 7500; // 30% advance for next month
  const totalPayAmount = remainingAmount + nextMonthAdvance; // Total to be paid

  const handlePayment = () => {
    // UPI payment link with phone number
    const upiLink = `upi://pay?pa=7902612134@superyes&pn=Bragtly&mc=0000&tid=CAFCO${Date.now()}&tr=CAFCOINV002&tn=Payment CAFCO Invoice&am=${totalPayAmount}&cu=INR`;

    // Open UPI link
    window.location.href = upiLink;
  };

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    const element = invoiceRef.current;

    // Store original styles
    const originalStyles = {
      width: element.style.width,
      maxWidth: element.style.maxWidth,
      transform: element.style.transform,
      transformOrigin: element.style.transformOrigin,
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      zIndex: element.style.zIndex,
    };

    // Force desktop layout for PDF generation
    element.style.width = '1200px';
    element.style.maxWidth = '1200px';
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.zIndex = '-1';
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';

    // Force all responsive elements to desktop layout
    const responsiveElements = element.querySelectorAll('.flex-col, .sm\\:flex-row, .grid-cols-1, .sm\\:grid-cols-2, .sm\\:grid-cols-4');
    const originalResponsiveStyles: { element: Element; styles: any }[] = [];

    responsiveElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      originalResponsiveStyles.push({
        element: el,
        styles: {
          display: htmlEl.style.display,
          flexDirection: htmlEl.style.flexDirection,
          gridTemplateColumns: htmlEl.style.gridTemplateColumns,
        }
      });

      // Force desktop layout
      if (htmlEl.classList.contains('flex-col')) {
        htmlEl.style.flexDirection = 'row';
      }
      if (htmlEl.classList.contains('grid-cols-1')) {
        htmlEl.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
      }
    });

    // Hide buttons before capturing
    const buttonsContainer = document.querySelector('.pdf-hide-buttons');
    let originalDisplay = '';
    if (buttonsContainer) {
      originalDisplay = (buttonsContainer as HTMLElement).style.display;
      (buttonsContainer as HTMLElement).style.display = 'none';
    }

    // Wait for layout to settle
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      width: 1200,
      windowWidth: 1200,
      windowHeight: element.scrollHeight,
    });

    // Restore all original styles
    Object.assign(element.style, originalStyles);

    // Restore responsive element styles
    originalResponsiveStyles.forEach(({ element, styles }) => {
      Object.assign((element as HTMLElement).style, styles);
    });

    // Restore buttons
    if (buttonsContainer) {
      (buttonsContainer as HTMLElement).style.display = originalDisplay;
    }

    const imgData = canvas.toDataURL("image/png");

    // Always use portrait orientation for consistent layout
    const pdf = new jsPDF('p', "mm", "a4");
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

  const services = [
    { description: "Total Project Amount", amount: total },
    { description: "Amount Already Paid (30%)", amount: paidAmount, isCredit: true },
    { description: "Remaining Balance Due (70%)", amount: remainingAmount, isPending: true },
    { description: "Next Month Advance (30%)", amount: nextMonthAdvance, isAdvance: true },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Invoice container for PDF capture */}
        <div ref={invoiceRef}>
          {/* New Invoice Template with Bragtly Header */}
          <div className="mb-12">
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

            {/* Services Table */}
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
                    {services.map((service, index) => {
                      let rowClass = "border-b border-border";
                      let textColor = "text-foreground";
                      let fontWeight = "font-medium";
                      let textSize = "text-sm";
                      let amountSize = "text-lg";

                      if (index === 0) {
                        rowClass = "bg-muted/50 border-b border-border";
                        fontWeight = "font-bold";
                      } else if (service.isCredit) {
                        textColor = "text-green-700";
                        fontWeight = "font-bold";
                      } else if (service.isPending) {
                        rowClass = "border-b border-border bg-orange-50";
                        textColor = "text-orange-600";
                        fontWeight = "font-bold";
                      } else if (service.isAdvance) {
                        textColor = "text-blue-700";
                        fontWeight = "font-bold";
                      }

                      return (
                        <tr key={index} className={rowClass}>
                          <td className={`px-8 py-6 ${textSize} ${fontWeight} ${textColor}`}>
                            {service.description}
                          </td>
                          <td className={`px-8 py-6 ${amountSize} ${fontWeight} ${textColor} text-right`}>
                            {service.isCredit ? '-' : ''}₹{service.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Payment Terms */}
            <Card className="shadow-lg border-x border-border">
              <div className="p-8">
                <h2 className="text-lg font-bold text-foreground mb-6">Payment Terms</h2>
                <div className="border-l-4 border-orange-500 pl-6 py-4 mb-4">
                  <p className="text-sm font-bold text-foreground mb-2">Remaining Payment Due</p>
                  <p className="text-xs text-muted-foreground mb-3">70% of total amount pending</p>
                  <p className="text-3xl font-bold text-orange-600">₹{remainingAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6 py-4 mb-4">
                  <p className="text-sm font-bold text-foreground mb-2">Next Month Advance</p>
                  <p className="text-xs text-muted-foreground mb-3">30% advance for upcoming month</p>
                  <p className="text-3xl font-bold text-blue-700">₹{nextMonthAdvance.toLocaleString('en-IN')}</p>
                </div>
                <Separator className="my-4" />
                <div className="border-l-4 border-purple-600 pl-6 py-4 bg-purple-50">
                  <p className="text-base font-bold text-foreground mb-2">Total Amount to Pay</p>
                  <p className="text-xs text-muted-foreground mb-3">Remaining balance + Next month advance</p>
                  <p className="text-4xl font-bold text-purple-800">₹{totalPayAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </Card>

            {/* Download and Payment Buttons */}
            <Card className="shadow-lg border-x border-b border-border rounded-b-2xl">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row justify-center gap-6 pdf-hide-buttons">
                  <Button
                    onClick={handleDownloadPDF}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v4h6V9h3.67L12 2z" />
                    </svg>
                    Download Invoice
                  </Button>
                  <Button
                    onClick={handlePayment}
                    size="lg"
                    className="bg-success hover:bg-success/90 text-success-foreground font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                    </svg>
                    Make Full Payment
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>



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
            <p className="text-sm text-muted-foreground mb-6">
              Recent month deliverables and campaign performance results.
            </p>
            <Separator className="my-6" />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border p-6 bg-muted/30">
                <p className="text-sm font-bold text-foreground mb-4">📦 Resources Delivered</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>13 Carousel Posters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>1 Influencer Video</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>4 Presentation Videos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Meta Ads Campaign Setup & Management</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-6 bg-muted/30">
                <p className="text-sm font-bold text-foreground mb-4">📊 Analytics & Results</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>30K+ Reach</strong> on Instagram & Facebook</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Review Rating: <strong>3.0 → 4.0</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Hiring Campaign: <strong>~150+ Leads</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Sales Campaign: <strong>~80+ Leads</strong></span>
                  </li>
                </ul>
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
                <path d="M12 3C7.03 3 3 6.58 3 11c0 1.99.74 3.83 2 5.29L4 21l4.85-1.27C10.03 20.58 11 20.77 12 20.77c4.97 0 9-3.58 9-8.77S16.97 3 12 3z" />
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
