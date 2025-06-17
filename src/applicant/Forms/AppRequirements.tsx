import PageBreadcrumb from "../../admin/admin-component/common/PageBreadCrumb";
import PageMeta from "../../admin/admin-component/common/PageMeta";

export default function AppRequirements() {
  return (
    <div>
      <PageMeta
        title="2023 GNPC Foundation Local Scholarship | Details & Eligibility"
        description="Scholarship details, eligibility, and required documents for the 2023 GNPC Foundation Local Scholarship."
      />
      <PageBreadcrumb pageTitle="GNPC Foundation Local Scholarship" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-gradient-to-br  px-5 py-7 dark:border-gray-800 dark:text-white dark:bg-black xl:px-10 xl:py-12 shadow-lg">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-amber-400 text-3xl  sm:text-4xl tracking-tight">
            2025 GNPC Foundation Local Scholarship
          </h2>
          <p className="mb-8 text-base text-gray-700 dark:text-white leading-relaxed">
            The 2025 GNPC Foundation Local Scholarship is open to eligible Year
            One and Continuing Ghanaian students pursuing postgraduate and
            undergraduate studies at any accredited tertiary institution in
            Ghana.
          </p>
          <div className="mb-8 text-left bg-white/80  dark:bg-gray-700 rounded-xl p-6   border-blue-100">
            <h3 className="font-semibold text-lg text-amber-500 mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
              Eligibility
            </h3>
            <ul className="list-disc ml-6 text-gray-700 dark:text-white space-y-1">
              <li>Applicant must be a Ghanaian.</li>
              <li>
                Must have obtained admission to pursue postgraduate or an
                undergraduate degree programme at an accredited tertiary
                institution in Ghana.
              </li>
              <li>
                Teachers and lecturers in STEM and TVET at technical
                institutions.
              </li>
            </ul>
            <p className="mt-3 text-sm text-red-600 font-medium">NOTE:</p>
            <p className="text-sm text-gray-700 dark:text-white">
              Nursing Training Colleges and Colleges of Education are not
              eligible.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div className="bg-white/80 rounded-xl p-6   border-yellow-100 dark:bg-black">
              <h4 className="font-semibold text-md text-amber-500 mb-2 ">
                Required Documents (Postgraduate)
              </h4>
              <ul className="list-disc ml-5 dark:text-white  text-gray-700 space-y-1">
                <li>Admission letter</li>
                <li>First degree Certificate</li>
                <li>CV</li>
                <li>Letters of recommendation (Academic and Occupational)</li>
                <li>National Service Certificate</li>
                <li>Passport Picture</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl p-6   border-green-100 dark:bg-gray-700">
              <h4 className="font-semibold text-md text-amber-500 mb-2">
                Required Documents (Undergraduate)
              </h4>
              <ul className="list-disc ml-5 text-gray-700 space-y-1 dark:text-white">
                <li>Admission letter</li>
                <li>WAEC results or Certificate</li>
                <li>Testimonial</li>
                <li>Birth Certificate or National Identification card</li>
                <li>Passport picture</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl p-6  dark:bg-gray-700  md:col-span-2">
              <h4 className="font-semibold text-md text-amber-500 mb-2">
                Required Documents for Continuing Students (Undergraduate)
              </h4>
              <ul className="list-disc ml-5 text-gray-700 space-y-1 dark:text-white ">
                <li>Admission letter</li>
                <li>Transcript results</li>
                <li>Birth Certificate or National Identification card</li>
                <li>Passport picture</li>
                <li>CGPA of 2.00 upwards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
