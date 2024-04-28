import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function RecentPicksTable() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Picks</CardTitle>
          <CardDescription>Recent picks made by users.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Round</TableHead>
              <TableHead className="text-right">Selection</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
              </TableCell>
              <TableCell className="text-right">Round of 16</TableCell>
              <TableCell className="text-right">Feinberg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
              </TableCell>
              <TableCell className="text-right">Round of 16</TableCell>
              <TableCell className="text-right">Feinberg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
              </TableCell>
              <TableCell className="text-right">Round of 16</TableCell>
              <TableCell className="text-right">Feinberg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
              </TableCell>
              <TableCell className="text-right">Round of 16</TableCell>
              <TableCell className="text-right">Feinberg</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
}
