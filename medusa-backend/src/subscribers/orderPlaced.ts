import {   
    type SubscriberConfig,   
    type SubscriberArgs,  
    OrderService,  
} from "@medusajs/medusa"  
    
export default async function handleOrderPlaced({   
    data, eventName, container, pluginOptions,   
}: SubscriberArgs<Record<string, string>>) {  
    const sendGridService = container.resolve("sendgridService")  
    const orderService: OrderService = container.resolve(  
    "orderService"  
    )  
    
    const order = await orderService.retrieve(data.id, {  
    relations: ["items", "items.variant", "items.variant.product", "customer"],  
    })  
    
    const items = order.items.map(item => ({
        title: item.variant.product.title,
        variant: item.variant.title,
        quantity: item.quantity,
        total: item.total,
    }))
    
    sendGridService.sendEmail({  
    templateId: "order-confirmation",
    // templateId: "d-9e2af5c553704b29930c230fec305a85",  
    from: "hello@medusajs.com",  
    // to: "your-email@example.com",  // replace with your email
    to: "tomasgp1997@gmail.com",  // replace with your email
    dynamic_template_data: {  
        items: items,
        subtotal: order.subtotal,
        total: order.total,
        customer: {
            name: order.customer.first_name + " " + order.customer.last_name,
            email: order.customer.email,
        }
        // add more fields as needed
    },  
    })  
}
    
export const config: SubscriberConfig = {  
    event: OrderService.Events.PLACED,  
    context: {  
    subscriberId: "order-placed-handler",  
    },  
}
