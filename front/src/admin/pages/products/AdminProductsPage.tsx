import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {
  return (
    <>
    <div className="flex items-center justify-between mb-10">
      <AdminTitle title={'Products'} subTitle={'Here you can visualize your products'} />
      <div className="felx justify-endmb-10 gap-4">
        <Link to='/admin/products/new'>
          <Button> <PlusIcon /> New Product </Button>
        </Link>
      </div>
    </div>
    <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sizes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow key={'invoice.invoice'}>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img src="https://placehold.co/250x250" alt="Product" className="w-20 h-20 opbject-cover rounded-md" />
            </TableCell>
            <TableCell>T-Shirt</TableCell>
            <TableCell>$19.99</TableCell>
            <TableCell>Men's Clothing</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">S</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">M</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">L</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">XL</span>
              </div>
            </TableCell>
            <TableCell className="text-right">actions</TableCell>
          </TableRow>
      </TableBody>
    </Table>
    <CustomPagination totalPages={10} limit={10} />
    </>
  )
}
