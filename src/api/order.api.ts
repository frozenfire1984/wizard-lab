export async function submitOrder(payload: any): Promise<{ orderId: string }> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })

  if (Math.random() < 0.5) {
    throw new Error('Сервер не отвечает')
  }

  return { orderId: 'PZ-' + Date.now() }
}