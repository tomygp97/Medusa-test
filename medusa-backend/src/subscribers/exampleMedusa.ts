import { 
    type SubscriberConfig, 
    type SubscriberArgs,
} from "@medusajs/medusa"

export default async function handleInviteCreated({ 
    data, eventName, container, pluginOptions, 
}: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")

    sendGridService.sendEmail({
        templateId: "d-9e2af5c553704b29930c230fec305a85",
        from: "hello@medusajs.com",
        to: "tomasgp1997@gmail.com",
        dynamic_template_data: {
        // any data necessary for your template...
        token: data.token,
        // items: data.items,
        // subtotal: data.order,
        // total: data.order.total,
        data: data,
        // customer: {
        //     name: data.order.customer.first_name + " " + data.order.customer.last_name,
        //     email: data.order.customer.email,
        // }
        // 
        },
    })
}

export const config: SubscriberConfig = {
    event: "invite.created",
    context: {
        subscriberId: "invite-created-handler",
    },
}