import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const invoiceDetails = {
    invoiceNumber: "CAFCO-INV-001",
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
    clientName: "CAFCO HOMES",
    clientAddress: "Furniture Solutions Provider",
    services: [
      { description: "Social Media Handling", quantity: "1 month", price: "Included" },
      { description: "Local SEO (Google Reviews, Profile)", quantity: "1", price: "Included" },
      { description: "Meta Ads Setup (Excludes Ad Budget)", quantity: "1", price: "Included" },
      { description: "Posters", quantity: "10", price: "Included" },
      { description: "Presentation Videos", quantity: "4", price: "Included" },
    ],
    total: 25000,
    advance: 7500,
    remaining: 17500,
  };

  const handlePayment = () => {
    // UPI payment link - replace with actual UPI ID
    const upiLink = `upi://pay?pa=bragtly@okaxis&pn=Bragtly&mc=0000&tid=CafcoAdvanceOct25&tr=CAFCOINV123&tn=Advance Payment for CAFCO Campaign&am=${invoiceDetails.advance}&cu=INR`;
    
    // Open UPI link
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-card rounded-t-2xl shadow-lg border border-border p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Bragtly</h1>
              <p className="text-sm text-muted-foreground">Digital Marketing Solutions</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-semibold text-foreground">INVOICE</p>
              <p className="text-sm text-muted-foreground">{invoiceDetails.invoiceNumber}</p>
              <p className="text-sm text-muted-foreground">{invoiceDetails.date}</p>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <Card className="shadow-lg border-x border-border">
          <div className="p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Invoice To</p>
                <p className="text-lg font-bold text-foreground">{invoiceDetails.clientName}</p>
                <p className="text-sm text-muted-foreground">{invoiceDetails.clientAddress}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Campaign</p>
                <p className="text-lg font-semibold text-foreground">Rapid Sale Campaign</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Services Table */}
        <Card className="shadow-lg border-x border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-8 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Price (INR)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoiceDetails.services.map((service, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-8 py-4 text-sm text-foreground">{service.description}</td>
                    <td className="px-8 py-4 text-sm text-foreground">{service.quantity}</td>
                    <td className="px-8 py-4 text-sm text-foreground text-right">{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Total & Payment Summary */}
        <Card className="shadow-lg border-x border-b border-border rounded-b-2xl">
          <div className="p-8">
            <div className="flex justify-end mb-6">
              <div className="w-full sm:w-80">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm font-medium text-foreground">Campaign Total</span>
                  <span className="text-sm font-semibold text-foreground">₹{invoiceDetails.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-4 bg-success/10 -mx-4 px-4 rounded-lg mt-4">
                  <span className="text-base font-bold text-success">Advance Due (30%)</span>
                  <span className="text-base font-bold text-success">₹{invoiceDetails.advance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-3 mt-2">
                  <span className="text-sm text-muted-foreground">Balance after approval</span>
                  <span className="text-sm text-muted-foreground">₹{invoiceDetails.remaining.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Payment Button */}
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={handlePayment}
                size="lg"
                className="w-full sm:w-auto bg-success hover:bg-success/90 text-success-foreground font-semibold text-base px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.51 11.87l-4.5-7.79C16.6 3.37 15.82 3 15 3H9c-.82 0-1.6.37-2.01 1.08l-4.5 7.79c-.2.34-.49.85-.49 1.29v5.59C2 19.99 3.01 21 4.25 21h15.5c1.24 0 2.25-1.01 2.25-2.25v-5.59c0-.44-.29-.95-.49-1.29zM12 17.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
                Pay ₹{invoiceDetails.advance.toLocaleString('en-IN')} Advance Now
              </Button>
              <p className="text-xs text-muted-foreground">
                Secure payment via Google Pay / UPI
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 bg-muted/30 rounded-lg p-6 border border-border">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-foreground mb-1">Bragtly Digital Marketing</p>
            <p className="text-xs text-muted-foreground">Email: contact@bragtly.com | Phone: +91-XXXXXXXXXX</p>
          </div>
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="text-center">
              <span className="font-semibold">Note:</span> Ad cost excluded from this invoice.
            </p>
            <p className="text-center">
              Delivery within 14 business days from advance payment confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
