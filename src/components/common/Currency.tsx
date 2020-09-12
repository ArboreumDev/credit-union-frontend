interface Props {
  type?: string
  amount: number
}
export const Currency = ({ type = "INR", amount }: Props) => (
  <span>
    {amount.toLocaleString("en-IN", {
      style: "currency",
      currency: type,
      minimumFractionDigits: 0,
    })}
  </span>
)
