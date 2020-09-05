interface Props {
  type?: string
  amount: number
}
export const Currency = ({ type = "INR", amount }: Props) => (
  <span>
    {amount.toLocaleString("en-GB", {
      style: "currency",
      currency: type,
      minimumFractionDigits: 2,
    })}
  </span>
)
