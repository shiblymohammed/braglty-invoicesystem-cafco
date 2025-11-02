import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Invoice = () => {
  const [currentDate] = useState(new Date().toLocaleDateString());
  
  // New invoice (current)
  const invoiceNumber2 = "INV-2023-002";
  const services2 = [
    { description: "Logo Design + Brand Identity", amount: 1000 },
    { description: "Brand Guidelines: 6 Mockups", amount: 5000 },
    { description: "Hiring Poster (3x @ ₹500 each)", amount: 1500 },
    { description: "Influencer Video Collaboration", amount: 10000 },
  ];
  const total2 = services2.reduce((sum, service) => sum + service.amount, 0);
  
  // Old invoice (completed)
  const invoiceNumber1 = "INV-2023-001";
  const services1 = [
    { description: "Logo Design", amount: 1000 },
    { description: "Brand Guidelines: 6 Mockups", amount: 5000 },
    { description: "Hiring Poster (3x @ ₹500 each)", amount: 1500 },
    { description: "Influencer Video Collaboration", amount: 10000 },
  ];
  const total1 = services1.reduce((sum, service) => sum + service.amount, 0);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handlePayment = () => {
    alert("Processing payment for invoice #" + invoiceNumber2);
    // Payment processing logic would go here
  };
  
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {/* New Invoice (Current) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Current Invoice</h2>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Pending</Badge>
        </div>
        
        <Card className="border-2">
          <CardHeader className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-1">INVOICE</h1>
                <p className="text-muted-foreground">#{invoiceNumber2}</p>
                <p className="text-muted-foreground mt-2">Date: {currentDate}</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">CAFCO</h2>
                <p className="text-muted-foreground">123 Business Street</p>
                <p className="text-muted-foreground">City, State 12345</p>
                <p className="text-muted-foreground">contact@cafco.com</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-6">
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p>Client Name</p>
              <p>Client Company</p>
              <p>Client Address</p>
              <p>client@email.com</p>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {services2.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{service.description}</td>
                    <td className="text-right py-3">₹{service.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-end mt-6">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Subtotal:</span>
                  <span>₹{total2.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Tax:</span>
                  <span>₹0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2 font-bold">
                  <span>Total:</span>
                  <span>₹{total2.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t flex flex-col items-start pt-6">
            <CardTitle className="mb-2">Payment Information</CardTitle>
            <p>Please make payment within 30 days.</p>
            <p className="mt-2">
              <span className="font-semibold">Bank Account:</span> CAFCO LLC
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> XXXX-XXXX-XXXX-1234
            </p>
            <div className="flex gap-4 mt-6 w-full">
              <Button onClick={handlePrint} className="w-1/2">Download Invoice</Button>
              <Button onClick={handlePayment} className="w-1/2 bg-green-600 hover:bg-green-700">Make Payment</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Old Invoice (Completed) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Previous Invoice</h2>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>
        </div>
        
        <Card className="border-2 opacity-80">
          <CardHeader className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-1">INVOICE</h1>
                <p className="text-muted-foreground">#{invoiceNumber1}</p>
                <p className="text-muted-foreground mt-2">Date: {currentDate}</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">CAFCO</h2>
                <p className="text-muted-foreground">123 Business Street</p>
                <p className="text-muted-foreground">City, State 12345</p>
                <p className="text-muted-foreground">contact@cafco.com</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-6">
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p>Client Name</p>
              <p>Client Company</p>
              <p>Client Address</p>
              <p>client@email.com</p>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {services1.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{service.description}</td>
                    <td className="text-right py-3">₹{service.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-end mt-6">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Subtotal:</span>
                  <span>₹{total1.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Tax:</span>
                  <span>₹0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2 font-bold">
                  <span>Total:</span>
                  <span>₹{total1.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t flex flex-col items-start pt-6">
            <div className="flex items-center gap-2">
              <CardTitle className="mb-2">Payment Information</CardTitle>
              <Badge className="bg-green-100 text-green-800 border-green-300">Paid</Badge>
            </div>
            <p>Payment received on {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            <p className="mt-2">
              <span className="font-semibold">Bank Account:</span> CAFCO LLC
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> XXXX-XXXX-XXXX-1234
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Thank you for your business!</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;