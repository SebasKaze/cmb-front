export default function Tabla(){
    return(
        <>
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-cols mt-10">
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Job</td>
                            <td>company</td>
                            <td>location</td>
                            <td>Last Login</td>
                            <td>Favorite Color</td>
                        </tr>
                    </thead>                    
                    <tbody>
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td>Blue</td>
                    </tr>
                    <tr>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Carroll Group</td>
                        <td>China</td>
                        <td>8/15/2020</td>
                        <td>Red</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    
                    </tfoot>
                </table>
                </div>
        </>
    )
}